#!/usr/bin/env bash

root="$(dirname "$(dirname "${BASH_SOURCE[0]}")")"

pnpm exec lex-cli generate \
	"$root"/../../lexicons/moe/hayden/cookware/*.json \
	-o src/atcute.ts \
	--description "Contains type declarations for Cookware lexicons"
