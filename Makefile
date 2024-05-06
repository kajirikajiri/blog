all:
	false
post:
	node scripts/make_post.js
build:
	sh scripts/build.sh
update_filename:
	bun scripts/update_filename.js '$(a)'
