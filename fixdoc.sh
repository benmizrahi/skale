#!/bin/sh

awk '
$1 == "#" {$0 = "# Contents"}
$1 == "##" {$1 = "#"}
$1 == "###" {$1 = "##"}
$1 == "####" {$1 = "###"}
{print}
' "$@"
