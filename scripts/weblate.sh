#!/bin/bash

# Check for Weblate token
if [ -z "$WEBLATE_TOKEN" ]; then
    echo "Error: WEBLATE_TOKEN is not set in the environment variables."
    exit 1
else
    TOKEN="$WEBLATE_TOKEN"
fi

supported_languages=("fa_IR" "ar" "en" "es_419" "tr" "es" "hr" "fr" "fr_CA" "de" "it" "pt" "pt_PT" "ro" "sv" "zh_HK")  # Define the list of supported languages here

if [ -z "$1" ] || [[ ! "$1" =~ ^--languages=(all|$(
    IFS=\|; echo "${supported_languages[*]}"
))$ ]]; then
    echo "Error: --languages argument is required and should be one of the supported languages or 'all'."
    echo "Usage: $0 --languages=fa_IR,ar,es_419,tr or $0 --languages=all"
    exit 1
fi

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../" >/dev/null 2>&1 && pwd )"
LANGFOLDER="${ROOT}/src/i18n/messages"
PROJECT_NAME="edspirit-microfrontends"
RESOURCE="home-page"

declare -A CODE_MAP
CODE_MAP["es"]="es_ES"
CODE_MAP["de"]="de_DE"
CODE_MAP["it"]="it_IT"
CODE_MAP["tr"]="tr_TR"
CODE_MAP["fa_IR"]="fa"

# Extract selected languages from arguments
LANGS_ARG=${1#--languages=}
if [ "$LANGS_ARG" == "all" ]; then
    SELECTED_LANGS=("${supported_languages[@]}")
else
    IFS=',' read -ra SELECTED_LANGS <<< "$LANGS_ARG"
    invalid_language=0
    for lang in "${SELECTED_LANGS[@]}"; do
        found=0
        for supported_lang in "${supported_languages[@]}"; do
            if [ "$lang" == "$supported_lang" ]; then
                found=1
                break
            fi
        done
        if [ $found -eq 0 ]; then
            echo "Error: Unsupported language '$lang'."
             invalid_language=1
        fi
    done
    if [ $invalid_language -eq 1 ]; then
        exit 1
    fi
fi

echo "Languages to process: ${SELECTED_LANGS[@]}"

for lang in "${SELECTED_LANGS[@]}"; do
    echo "Updating \"Home Page\" translation. Language: \"$lang\":"
    echo "https://translate.avidcloud.io/api/translations/$PROJECT_NAME/$RESOURCE/$lang/file/"

    # Download the translation file based on the language code
    curl -X GET -H "Authorization: Token $TOKEN" "https://translate.avidcloud.io/api/translations/$PROJECT_NAME/$RESOURCE/$lang/file/" -o "${LANGFOLDER}/${lang}.json"

    # Check if the language has a mapped value in CODE_MAP
    if [[ -n "${CODE_MAP[$lang]}" ]]; then
        # If mapped value exists, create an additional file with the mapped value as the filename
        echo "Creating file with mapped value: ${CODE_MAP[$lang]}.json"
        cp "${LANGFOLDER}/${lang}.json" "${LANGFOLDER}/${CODE_MAP[$lang]}.json"
    fi

    echo "Pulling language \"$lang\" Done."
done