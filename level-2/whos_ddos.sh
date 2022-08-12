#!/usr/bin/env bash

set -e
LOG_DIR="level-2/logs"
CIDR_PREFIX="172.16"

if [[ ! -d ${LOG_DIR} ]]; then
  pushd
  curl https://challenge.stargazr.ai/2022/2/logs.zip -sLo logs.zip
  unzip logs.zip
  popd
fi

# This is a bit clever. We're assuming that each log begins at exactly the same moment
# Therefore, an earlier appeance in this log is an earlier event
# The conditions are "[computers] never communicate [...] unless the DDOS service is running"
# Therefore, the first outbound request towards a local IP is our attacker
# grep -n -> returns the line number a result occured on
# sort -tnk will sort the output numerically by the 2nd column (delinated by ':')
# head -n1 gives us the first result
ATTACKER_LINE=$(grep "OUT ${CIDR_PREFIX}" -n level-2/logs/* | sort -t':' -nk2 | head -n1)
ATTACKER=$(echo "${ATTACKER_LINE}" | awk -F'/' '{print $3}' | sed "s/.txt.*//")
ATTACK_TIME=$(echo "${ATTACKER_LINE}" | awk -F':' '{print $2}')

echo "The first host to send a local request was ${ATTACKER} at event #${ATTACK_TIME}"
