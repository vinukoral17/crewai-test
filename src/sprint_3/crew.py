"""Builds the Crew responsible for mimicking a target website.

The module reads agent and task definitions from YAML files, wires up shared
tools such as the ``file_writer`` and ``SerperDevTool``, and exposes a helper
function :func:`build_crew` that returns a ready-to-run ``Crew`` instance.  The
crew analyses a target site, scaffolds a Next.js project and finally validates
the build.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Dict, Any

import yaml
from crewai import Agent, Crew, LLM, Process, Task
from crewai_tools import SerperDevTool

from .tools.file_writer import file_writer


def _load_yaml(path: Path) -> Dict[str, Any]:
    """Load a YAML configuration file into a Python dictionary."""

    with open(path, "r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def build_crew(target_url: str, repo_root: str) -> Crew:
    """Construct and configure the Sprint 3 crew.

    Parameters
    ----------
    target_url:
        URL of the website whose layout will be mimicked.
    repo_root:
        Absolute path to the repository root used by the ``file_writer`` tool.
    """

    config_dir = Path(__file__).resolve().parent / "config"
    agents_cfg = _load_yaml(config_dir / "agents.yaml")
    tasks_cfg = _load_yaml(config_dir / "tasks.yaml")

    # Base LLM configuration shared by all agents.
    llm = LLM(
        model=os.getenv("MODEL"),
        api_key=os.getenv("GEMINI_API_KEY"),
        provider="gemini",
        temperature=0.6,
    )

    # Map simple tool names to actual implementations.
    tool_registry = {
        "file_writer": file_writer,
        "serper": SerperDevTool(),
    }

    agents: Dict[str, Agent] = {}
    for name, cfg in agents_cfg.items():
        tools = [tool_registry[t] for t in cfg.get("tools", [])]
        agents[name] = Agent(
            role=cfg["role"],
            goal=cfg["goal"],
            backstory=cfg.get("backstory", ""),
            tools=tools,
            llm=llm,
            verbose=True,
        )

    tasks = []
    for name, cfg in tasks_cfg.items():
        task = Task(
            description=cfg["description"],
            agent=agents[cfg["agent"]],
            expected_output=cfg.get("expected_output"),
            async_execution=cfg.get("async", False),
        )
        tasks.append(task)

    crew = Crew(
        agents=list(agents.values()),
        tasks=tasks,
        process=Process.sequential,
        verbose=True,
    )

    return crew


__all__ = ["build_crew"]

