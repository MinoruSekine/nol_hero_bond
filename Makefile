HTML_FILE_NAME := index.html
CSS_FILE_NAME := nol_hero_bond.css
JS_FILE_NAME := nol_hero_bond.js
TS_FILE_NAME := nol_hero_bond.ts

SRC_DIR := .
SRC_HTML := $(SRC_DIR)/$(HTML_FILE_NAME)
SRC_CSS := $(SRC_DIR)/$(CSS_FILE_NAME)
SRC_TS := $(SRC_DIR)/$(TS_FILE_NAME)

OUT_ROOT_DIR := out
OUT_JS := $(OUT_ROOT_DIR)/$(JS_FILE_NAME)
SITE_OUT_DIR := $(OUT_ROOT_DIR)/site
SITE_OUT_HTML := $(SITE_OUT_DIR)/$(HTML_FILE_NAME)
SITE_OUT_CSS := $(SITE_OUT_DIR)/$(CSS_FILE_NAME)
SITE_OUT_JS := $(SITE_OUT_DIR)/$(JS_FILE_NAME)
SITE_OUT_JSDOC_DIR := $(SITE_OUT_DIR)/jsdoc
SITE_OUT_JSDOC_HTML := $(SITE_OUT_JSDOC_DIR)/index.html

VERSION := $(shell git log -n 1 --pretty=format:"%h")

all: site

clean: clean-out clean-js

clean-out: clean-site
	rm -rf $(OUT_ROOT_DIR)

clean-site:
	rm -rf $(SITE_OUT_DIR)

clean-js:
	rm -f $(OUT_JS)

site:  $(SITE_OUT_HTML) $(SITE_OUT_CSS) $(SITE_OUT_JS) site-jsdoc

$(SITE_OUT_DIR):
	mkdir -p $@

$(SITE_OUT_HTML): $(SITE_OUT_DIR) $(SRC_HTML)
	sed 's/NolHeroBondVersion/$(VERSION)/g' $(SRC_HTML) > $(SITE_OUT_HTML)

$(SITE_OUT_CSS): $(SITE_OUT_DIR) $(SRC_CSS)
	cp $(SRC_CSS) $(SITE_OUT_CSS)

$(SITE_OUT_JS): $(SITE_OUT_DIR) $(OUT_JS)
	cp $(OUT_JS) $(SITE_OUT_JS)

$(SITE_OUT_JSDOC_DIR): $(SITE_OUT_DIR)
	mkdir -p $@

$(SITE_OUT_JSDOC_HTML): $(SITE_OUT_JSDOC_DIR) $(OUT_JS)
	npm run doc

$(OUT_JS): $(SRC_TS)
	npx tsc

site-jsdoc: $(SITE_OUT_JSDOC_HTML)

lint: tslint stylelint

tslint:
	npm run lint nol_hero_bond.ts

stylelint:
	npm run stylelint

.PHONY: all clean clean-out clean-site clean-js site site-jsdoc lint eslint stylelint
