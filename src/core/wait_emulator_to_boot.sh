#!/bin/bash

booted=""
failures=0
until [[ "$booted" =~ "stopped" ]]; do
    echo "adb -s emulator-$1 shell getprop init.svc.bootanim"
    booted=`adb -s emulator-"$1" shell getprop init.svc.bootanim 2>&1`
    echo "$booted"
    if [[ "$booted" =~ "not found" ]]; then
        let "failures += 1"
        echo "## Not found: $failures"
        if [[ $failures -gt 5 ]]; then
            echo "Could not boot emulator $1"
            exit 1
        fi
    elif [[ "$booted" =~ "protocol fault" ]]; then
        echo "Restarting adb server"
        stop=`adb kill-server`
        sleep 2
        start=`adb start-server`
        echo "$start"
    fi
    sleep 6
done
echo "Android Emulator $1 successfully booted"