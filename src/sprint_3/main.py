"""Command line interface for the Sprint 3 crew.

This script accepts a target URL and repository root, sets up the necessary
environment variables and invokes the crew defined in :mod:`crew`.  After
execution it prints a compact JSON summary so results can be inspected or
chained by other tools.
"""

from __future__ import annotations

import argparse
import json
import os

from .crew import build_crew


def main() -> None:
    """Parse command line arguments and execute the crew."""

    parser = argparse.ArgumentParser(description="Run the Sprint 3 site mimicker")
    parser.add_argument("--url", required=True, help="Target site URL for layout analysis")
    parser.add_argument(
        "--repo-root", default=".", help="Repository root for safe file writes"
    )
    args = parser.parse_args()

    # Expose the values so that agents can reference them directly.
    os.environ["TARGET_URL"] = args.url
    os.environ["REPO_ROOT"] = args.repo_root

    crew = build_crew(target_url=args.url, repo_root=args.repo_root)

    # Run all tasks and capture the combined result.
    result = crew.kickoff(inputs={"target_url": args.url, "repo_root": args.repo_root})

    # Emit a compact JSON summary to STDOUT.
    print(json.dumps({"status": "completed", "result": str(result)}, indent=2))


if __name__ == "__main__":
    main()

