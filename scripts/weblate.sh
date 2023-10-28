#!/bin/bash

# check for weblate token
if [ -z "$WEBLATE_TOKEN" ]; then
echo "Error: WEBLATE_TOKEN is not set in the environment variables."
exit 1
else
TOKEN="$WEBLATE_TOKEN"
fi



if [ -z "$1" ] || [[ ! "$1" =~ ^--languages= ]]; then
echo "Error: --languages argument is required."
echo "Usage: $0 --languages=fa_IR,ar,es_419,tr"
exit 1
fi

LANGS_ARG=${1#--languages=}
IFS=',' read -ra LANGS <<< "$LANGS_ARG"

echo "languages: ${LANGS[@]}"
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )"/.. >/dev/null 2>&1 && pwd )/"
LANGFOLDER=${ROOT}src/i18n/messages
PROJECT_NAME=edspirit-mircrofrontends
RESOURCE='home-page'

LELEMENTS=${#LANGS[@]}

for (( i=0;i<$LELEMENTS;i++)); do
  echo Updating \"Home Page\" translation. Language: \"${LANGS[${i}]}\" :
  echo https://translate.avidcloud.io/api/translations/$PROJECT_NAME/$RESOURCE/${LANGS[${i}]}/file/
  curl -X GET \
    -H "Authorization: Token $TOKEN" \
    https://translate.avidcloud.io/api/translations/$PROJECT_NAME/$RESOURCE/${LANGS[${i}]}/file/ \
    -o ${LANGFOLDER}/${LANGS[${i}]}.json
  echo ""
done