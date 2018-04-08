module.exports = {
    PERMISSION: {
        SETTINGS: {
            NAME: {
                PERMISSION: 1,
                DISPLAY_NAME: 'Modify Name',
            },
            LOGO: {
                PERMISSION: 2,
                DISPLAY_NAME: 'Modify Logo',
            },
            DESCRIPTION_SHORT: {
                PERMISSION: 3,
                DISPLAY_NAME: 'Modify Short Description',
            },
            DESCRIPTION_LONG: {
                PERMISSION: 4,
                DISPLAY_NAME: 'Modify Description',
            },
            SCREENSHOTS: {
                PERMISSION: 5,
                DISPLAY_NAME: 'Modify Screenshots',
            },
            CATEGORY: {
                PERMISSION: 6,
                DISPLAY_NAME: 'Modify Categories',
            },
            TAGS: {
                PERMISSION: 7,
                DISPLAY_NAME: 'Modify Tags',
            },
            ARCHIVE: {
                PERMISSION: 8,
                DISPLAY_NAME: 'Archive Project',
            },
            DELETE: {
                PERMISSION: 9,
                DISPLAY_NAME: 'Delete Project',
            },
        },

        MEMBER: {
            ADD: {
                PERMISSION: 50,
                DISPLAY_NAME: 'Add Member',
            },
            REMOVE: {
                PERMISSION: 51,
                DISPLAY_NAME: 'Remove Member',
            },
            MODIFY: {
                PERMISSION: 52,
                DISPLAY_NAME: 'Modify Member',
            },
        },

        PROJECT: {
            SOURCE: {
                PERMISSION: 99,
                DISPLAY_NAME: 'Modify Source URL',
            },
            ISSUES: {
                PERMISSION: 101,
                DISPLAY_NAME: 'Modify Issue URL',
            },
            DISCORD: {
                PERMISSION: 102,
                DISPLAY_NAME: 'Modify Discord URL',
            },
            TWITTER: {
                PERMISSION: 103,
                DISPLAY_NAME: 'Modify Twitter URL',
            },
            PATREON: {
                PERMISSION: 104,
                DISPLAY_NAME: 'Modify Patreon URL',
            },
            PAYPAL: {
                PERMISSION: 105,
                DISPLAY_NAME: 'Modify Paypal URL',
            },
            WIKI: {
                PERMISSION: 106,
                DISPLAY_NAME: 'Modify Wiki URL',
            },
        },

        FILE: {
            UPLOAD: {
                PERMISSION: 150,
                DISPLAY_NAME: 'File Uploading',
            },
            ARCHIVE: {
                PERMISSION: 152,
                DISPLAY_NAME: 'File Archiving',
            },
            DELETE: {
                PERMISSION: 153,
                DISPLAY_NAME: 'File Delete',
            },
            CHANGELOG: {
                PERMISSION: 154,
                DISPLAY_NAME: 'Modify File Changelog',
            },
            VERSION_GAME: {
                PERMISSION: 155,
                DISPLAY_NAME: 'Modify File Game Versions',
            },
            VERSION_JAVA: {
                PERMISSION: 156,
                DISPLAY_NAME: 'Modify File Java Versions',
            },
            RELEASE_TYPE: {
                PERMISSION: 157,
                DISPLAY_NAME: 'Modify File Release Type',
            },
            DEPENDENCIES: {
                PERMISSION: 158,
                DISPLAY_NAME: 'Modify Dependencies',
            },
        },
    },
    /**
     * Returns true if the user has permission, using bitshifting to unshift the permission integer.
     * @param permissions The user permissions for the project.
     * @param type The permission you are checking if the user has.
     * @returns {boolean}
     */
    hasProjectPermission(permissions, type) {
        if (permissions == null) {
            return false;
        }

        for (const i in permissions) {
            if (permissions[i] === type.PERMISSION) {
                return true;
            }
        }
        return false;
    },

    containsProjectPermission(permissions, type) {
        if (permissions == null) {
            return false;
        }

        for (const j in permissions) {
            for (const i in type) {
                if (permissions[j] === type[i].PERMISSION) {
                    return true;
                }
            }
        }
        return false;
    },
};
