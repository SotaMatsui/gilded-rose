#!/usr/bin/env python3
"""
This script uses Bun to execute the TextTest Fixture for TypeScript.
It is designed to be used by TextTest and specified in the file 'texttests/config.gr' in this repo.
It is more convenient for TextTest to use since Bun needs
several arguments in addition to the one the TextTest fixture needs.
"""
import os
import subprocess
import sys
from pathlib import Path

TEXTTEST_HOME = Path(os.environ.get("TEXTTEST_HOME", os.getcwd()))
result = subprocess.run(
    ["bun", "run", "--silent", "test:golden", *sys.argv[1:]],
    cwd=TEXTTEST_HOME / "TypeScript",
)
sys.exit(result.returncode)
