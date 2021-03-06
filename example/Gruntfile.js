/**
 * JBoss, Home of Professional Open Source
 * Copyright Red Hat, Inc., and individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        grunt_android_emulator: {
            emulators: [{
                id: 'emulator-1',
                create: {
                    '--name': 'device-1',
                    //'--sdcard': '10M',
                    //'--snapshot': '',
                    //'--path': 'avd',
                    '--force': '',
                    //'--skin': '',
                    '--target': 'android-18',
                    '--abi': 'armeabi-v7a',
                    '--device': "'Nexus 7 2013'"
                },
                start: {
                    '-port': '5556',
                    '-no-window': '',
                    '-no-audio': '',
                    '-no-skin': ''
                }
            },{
                id: 'emulator-2',
                create: {
                    '--name': 'device-2',
                    //'--sdcard': '10M',
                    //'--snapshot': '',
                    //'--path': 'avd',
                    '--force': '',
                    //'--skin': '',
                    '--target': 'android-18',
                    '--abi': 'armeabi-v7a'
                },
                start: {
                    '-port': '5558',
                    '-no-window': '',
                    '-no-audio': '',
                    '-no-skin': ''
                }
            }],
            apks: [{
                id: "apk-1",
                path: "./apk/AeroGear.apk",
                activities: [{
                    id: "main",
                    packageName: "org.jboss.aerogear",
                    name: "AeroGear"
                }]
            },{
                id: "apk-2",
                path: "./apk/AeroGearCordova.apk",
                activities:[{
                    id: "activity-1",
                    packageName: "",
                    name: ""
                },{
                    id: "activity-2",
                    packageName: "org.jboss.aerogear.cordova",
                    name: "AeroGearCordova"
                }]
            }]
        },
        jshint: {
            all: {
                src: [ "Gruntfile.js" ],
                options: {
                    jshintrc: "../.jshintrc"
                }
            }
        }
    });
   
    grunt.loadNpmTasks('grunt-android-emulator');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint',
                                    'create-android-emulator:emulator-1',
                                    'create-android-emulator:emulator-2',
                                    'start-android-emulator:emulator-1',
                                    'start-android-emulator:emulator-2',
                                    'unlock-android-emulator:emulator-1',
                                    'unlock-android-emulator:emulator-2',
                                    'install-apk:emulator-1:apk-1',
                                    'install-apk:emulator-2:apk-2',
                                    'start-activity:emulator-1:apk-1:main',
                                    'start-activity:emulator-2:apk-2:activity-2',
                                    'stop-android-emulator:emulator-1',
                                    'stop-android-emulator:emulator-2']);
};
