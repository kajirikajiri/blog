all:
	false
post:
	node scripts/make_post.js
build:
	sh scripts/build.sh
filename:
	bun scripts/make_filename.js '$(a)'
