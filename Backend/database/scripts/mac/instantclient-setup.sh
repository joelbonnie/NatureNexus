#!/bin/bash

# Change to the directory where the script is located
cd "$(dirname "$0")"

echo "Please enter the absolute path to the Oracle Instant Client directory:"
read oraclePath

# Construct the local start script
(
echo '#!/bin/bash'
echo
echo '# Change to the directory where the script is located'
echo 'cd "$(dirname "$0")"'
echo
echo "# Configure the oracle instant client env variable"
echo "export DYLD_LIBRARY_PATH=$oraclePath:\$DYLD_LIBRARY_PATH"
echo
echo "# Start Node application"
# NOTE: You may need to change this path. Not too sure exactly why, but I had to fiddle with my path. -CC
echo "exec node ../bin/www"
) > ../../local-start.sh

# Change the permissions of the script to make it executable
chmod +x ../../local-start.sh
# NOTE: This file will generate local-start.sh. You'll have to run YOUR generated local-start.sh, not the 
# one that's in the GitHub (if it exists!!). I just couldn't find a way to .gitignore the generated local-start.sh, since 
# it may be generated in different locations in the directory. -CC
echo "--------------------------------------------------------------------------"
echo "Setup complete. Run 'sh local-start.sh' in your project folder to start your Node.js application."
echo "--------------------------------------------------------------------------"

exit 0