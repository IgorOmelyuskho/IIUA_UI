#@IgnoreInspection BashAddShebang
#http://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux#answer-5947802
NC='\033[0m' # No Color

RED='\033[0;31m'
LightBlue='\033[1;34m'
Yellow='\033[1;33m'
White='\033[1;37m'
LightGreen='\033[1;32m'
LightGray='\033[0;37m'
DarkGray='\033[1;30m'

# check if kill_app function is included
# described in utils/application.sh file
# kill_app will be called from print_error function
# for correct errors processing
function exists_kill_app {
  type kill_app > /dev/null 2>&1;
  return "$?"
}

function exit_if_possible {
  exists_kill_app
  if [[ "0" == "$?" ]];then
    kill_app
  fi
}

# @param $1 text
print_shell () {
    printf "${DarkGray}[PATH]$(pwd)${NC}\n"
    printf "${DarkGray}[USER]$(whoami)${NC}\n"
    printf "${DarkGray}[COMMAND]${NC}'$1'\n"
    printf "${DarkGray}"
    eval $1
    printf "${NC}"
    echo -e "\n"
}
# @param $1 text
print_info () {
    printf "${LightBlue}[INFO]${NC} $1\n"
}

# @param $1 text
print_regular () {
    echo -e "$1"
}

# @param $1 text
print_error () {
    printf "${RED}[ERROR]${NC} $1\n"
    exit_if_possible
    exit 1
}

# @param $1 text
print_warn () {
    printf "${Yellow}[WARN]${NC} $1\n"
}

# @param $1 text
print_title () {
  echo -e " "
  printf "${LightGreen}--> $1${NC} | $(date +%H:%M)\n"
  echo -e " "
}
