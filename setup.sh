#!/bin/sh

set -eux

yarn

(
	# needs to be rebuilt every time you update rust code
	# note - the first time will take a while
	cd shortest-path
	wasm-pack build

	(
		cd pkg
		yarn link
	)
)

yarn link shortest-path

