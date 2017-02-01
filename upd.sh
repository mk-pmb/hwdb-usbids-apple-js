#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function upd () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m "$BASH_SOURCE"/..)"
  cd "$SELFPATH" || return $?

  local SD_REPO='https://github.com/systemd/systemd/raw/master/'
  dwnl "$SD_REPO" 'LICENSE.LGPL2.1'{,.txt} || return $?
  local HWDB_FN='hwdb/20-usb-vendor-model.hwdb'
  dwnl "$SD_REPO" "$HWDB_FN" || return $?

  grep -Pe '^usb:v05AC' -A 1 -- "$HWDB_FN" | sed -nre '
    /^usb:/N
    s~^usb:v(05AC)\*\s+ID_VENDOR_FROM_DATABASE=~\1 ~p
    s~^usb:v05ACp([0-9a-fA-F]{4})\*\s+ID_MODEL_FROM_DATABASE=\s*~  \1 ~p
    ' | sed -re '
    s~\s+$~~
    s~\\~\\u005C~g
    s~\x22~\\u0022~g
    s~\x27~\\u0027~g
    s~^ *\S{4} ~\L&\E~
    s~^( {0})(\S{4}) ~\1"\2": { "": "~
    s~^( {2})(\S{4}) ~\1"\2": "~
    s~$~",~
    1s~^\s*~{ ~
    $s~,$~\n} }~
    ' >hwdb/apple.json

  return 0
}


function dwnl () {
  local SRC_BASE="$1"; shift
  local SRC_FN="$1"; shift
  local SAVE_FN="$1"; shift
  [ -n "$SAVE_FN" ] || SAVE_FN="$SRC_FN"
  [ -n "$SAVE_FN" ] || return 4$(echo "E: no SAVE_FN" >&2)
  if [ -s "$SAVE_FN" ]; then
    du -h "$SAVE_FN"
    return 0
  fi
  wget -c "$SRC_BASE$SRC_FN" -O "$SAVE_FN".part || return $?
  mv --no-clobber --verbose -- "$SAVE_FN"{.part,} || return $?
  return 0
}










[ "$1" == --lib ] && return 0; upd "$@"; exit $?
