"""Utility tool for safely writing files inside the repository.

This module exposes a `file_writer` tool that generation agents can call to
materialise code on disk.  It enforces a security boundary based on the
provided repository root so that agents cannot traverse outside of the
project.  Every write ensures parent directories exist and returns the
absolute path of the created file.
"""

from pathlib import Path
from typing import Any

from crewai_tools import tool


@tool("file_writer")
def file_writer(path: str, content: str, mode: str = "w", repo_root: str = ".") -> str:
    """Persist ``content`` to ``path`` relative to ``repo_root``.

    Args:
        path: Destination file path relative to ``repo_root``.
        content: Textual data that will be written to the file.
        mode: File open mode, defaults to ``"w"`` to overwrite existing files.
        repo_root: Root directory that acts as a sandbox for writes.

    Returns:
        The absolute path of the written file.

    Raises:
        ValueError: If the resolved destination escapes ``repo_root``.
    """

    root = Path(repo_root).resolve()
    destination = (root / path).resolve()

    # Guard against directory traversal outside of ``repo_root``.
    if not str(destination).startswith(str(root)):
        raise ValueError("Attempted write outside repo_root")

    # Ensure parent directories exist before writing.
    destination.parent.mkdir(parents=True, exist_ok=True)

    # Write the file using the requested mode.
    with open(destination, mode, encoding="utf-8") as handle:
        handle.write(content)

    return str(destination)


__all__ = ["file_writer"]

