/*
 * Copyright (C) Highsoft AS
 */

/* eslint-disable no-shadow, no-use-before-define */

const Crypto = require('node:crypto');
const FS = require('node:fs');
const Path = require('node:path');

/* *
 *
 *  Constants
 *
 * */

/** POSIX-uniform directory separator */
const PSEP = Path.posix.sep;

/** System-conform direcotry separator */
const SEP = Path.sep;

/* *
 *
 *  Functions
 *
 * */

/**
 * Copies all files of a directory.
 *
 * @param {string} directorySourcePath
 *        Directory to get files from
 *
 * @param {string} directoryTargetPath
 *        Directory to copy files into
 *
 * @param {boolean} [includeSubDirectories]
 *        Set to true to copy files from sub-directories
 *
 * @param {Function} [filterFunction]
 *        Return true to include a file, return a string to change the
 *        targetPath
 *
 * @return {void}
 */
function copyAllFiles(
    directorySourcePath,
    directoryTargetPath,
    includeSubDirectories,
    filterFunction
) {
    const filePaths = getFilePaths(directorySourcePath, includeSubDirectories);

    if (filePaths.length === 0) {
        return;
    }

    const pathIndex = directorySourcePath.length;

    if (typeof filterFunction === 'function') {

        let targetPath, filterResult;
        filePaths.forEach(sourcePath => {

            targetPath = Path.join(
                directoryTargetPath, sourcePath.substring(pathIndex)
            );

            filterResult = filterFunction(sourcePath, targetPath);

            if (!filterResult) {
                return;
            }

            if (typeof filterResult === 'string') {
                copyFile(sourcePath, filterResult);
            } else {
                copyFile(sourcePath, targetPath);
            }
        });
    } else {
        filePaths.forEach(filePath => copyFile(
            filePath,
            Path.join(directoryTargetPath, filePath.substring(pathIndex))
        ));
    }
}

/**
 * Copies a file.
 *
 * @param {string} fileSourcePath
 *        File to copy
 *
 * @param {string} fileTargetPath
 *        New file
 *
 * @return {void}
 */
function copyFile(fileSourcePath, fileTargetPath) {
    FS.mkdirSync(Path.dirname(fileTargetPath), { recursive: true });
    FS.writeFileSync(fileTargetPath, FS.readFileSync(fileSourcePath));
}

/**
 * Deletes a directory recursivly.
 *
 * @param {string} directoryPath
 *        Directory path
 *
 * @param {Function} [filterCallback]
 *        Callback to return `true` for files to delete, otherwise will
 *        eventually fail.
 *
 * @return {void}
 *
 * @throws {Error}
 */
function deleteDirectory(
    directoryPath,
    filterCallback
) {
    if (!FS.existsSync(directoryPath)) {
        return;
    }

    if (filterCallback) {
        getDirectoryPaths(directoryPath).forEach(
            path => deleteDirectory(path, filterCallback)
        );

        for (const filePath of getFilePaths(directoryPath)) {
            if (filterCallback(filePath) === true) {
                deleteFile(filePath);
            }
        }

        FS.rmdirSync(directoryPath);
    } else {
        FS.rmSync(directoryPath, { recursive: true });
    }

}

/**
 * Deletes a file.
 *
 * @param {string} filePath
 *        File path
 *
 * @return {void}
 *
 * @throws {Error}
 */
function deleteFile(filePath) {

    if (!FS.existsSync(filePath)) {
        return;
    }

    FS.unlinkSync(filePath);
}

/**
 * Calculates the SHA256 hash of a directories content.
 *
 * @param {string} directoryPath
 *        Directory path
 *
 * @param {boolean} [useFileContent]
 *        Set to true to check the file content instead of meta data
 *
 * @param {Function} [contentFilter]
 *        Filter file content like source comments
 *
 * @return {string}
 *         Hexadecimal hash value
 */
function getDirectoryHash(directoryPath, useFileContent, contentFilter) {
    const directoryHash = Crypto.createHash('sha256');

    if (useFileContent) {

        getFilePaths(directoryPath, true)
            .sort()
            .forEach(path => {

                directoryHash.update(Path.basename(path));
                directoryHash.update(
                    contentFilter ?
                        (
                            contentFilter(FS.readFileSync(path).toString()) ||
                            ''
                        ) :
                        FS.readFileSync(path).toString()
                );
            });
    } else {

        let meta;

        [directoryPath]
            .concat(...getDirectoryPaths(directoryPath, true))
            .concat(...getFilePaths(directoryPath, true))
            .sort()
            .forEach(path => {

                meta = FS.lstatSync(path);

                directoryHash.update(Path.basename(path));
                directoryHash.update([
                    meta.dev,
                    meta.gid,
                    meta.mode,
                    meta.mtimeMs,
                    meta.size,
                    meta.uid
                ].join(':'));
            });
    }

    return directoryHash.digest('hex');
}

/**
 * Get sub-directory paths from a directory.
 *
 * @param {string} directoryPath
 *        Directory to get directories from
 *
 * @param {boolean} [includeSubDirectories]
 *        Set to true to get directories inside sub-directories
 *
 * @return {Array<string>}
 *         Sub-directory paths
 */
function getDirectoryPaths(directoryPath, includeSubDirectories) {
    const directoryPaths = [];

    let entryPath;
    let entryStat;

    if (isDirectory(directoryPath)) {
        FS.readdirSync(directoryPath).forEach(entry => {

            entryPath = Path.join(directoryPath, entry);
            entryStat = FS.lstatSync(entryPath);

            if (entryStat.isDirectory()) {

                directoryPaths.push(entryPath);

                if (includeSubDirectories) {
                    directoryPaths.push(
                        ...getDirectoryPaths(entryPath, includeSubDirectories)
                    );
                }
            }
        });
    }

    return directoryPaths;
}

/**
 * Get file content.
 *
 * @param {string} filePath
 * File path to read from.
 *
 * @param {boolean} [asJSON]
 * Whether to parse as JSON.
 *
 * @return {string|*}
 * UTF-8 content or JSON.
 */
function getFile(filePath, asJSON) {
    let data = FS.readFileSync(filePath, 'utf8');

    if (asJSON) {
        data = JSON.parse(data);
    }

    return data;
}

/**
 * Calculates the SHA256 hash of a files content.
 *
 * @param {string} filePath
 *        File path
 *
 * @param {Function} [contentFilter]
 *        Filter file content like source comments
 *
 * @return {string}
 *         Hexadecimal hash value
 */
function getFileHash(filePath, contentFilter) {

    return Crypto
        .createHash('sha256')
        .update(
            contentFilter ?
                (contentFilter(FS.readFileSync(filePath).toString()) || '') :
                FS.readFileSync(filePath).toString()
        )
        .digest('hex');
}

/**
 * Get file paths from a directory.
 *
 * @param {string} directoryPath
 *        Directory to get files from
 *
 * @param {boolean} [includeSubDirectories]
 *        Set to true to get files from sub-directories
 *
 * @return {Array<string>}
 *         File paths
 */
function getFilePaths(directoryPath, includeSubDirectories) {
    const filePaths = [];

    let entryPath;
    let entryStat;

    if (isDirectory(directoryPath)) {
        FS.readdirSync(directoryPath).forEach(entry => {

            entryPath = Path.join(directoryPath, entry);
            entryStat = FS.lstatSync(entryPath);

            if (entryStat.isFile()) {
                filePaths.push(entryPath);
            } else if (includeSubDirectories && entryStat.isDirectory()) {
                filePaths.push(
                    ...getFilePaths(entryPath, includeSubDirectories)
                );
            }
        });
    }

    return filePaths;
}


/**
 * GZIPs a single file.
 *
 * @todo Use in dist task.
 *
 * @param {string} fileSourcePath
 *        Path to source file.
 *
 * @param {string} fileTargetPath
 *        Path to target file.
 *
 * @return {Promise<string>}
 *         Promise to keep
 */
function gzipFile(fileSourcePath, fileTargetPath) {
    const ZLib = require('zlib');

    return new Promise((resolve, reject) => {

        FS
            .createReadStream(fileSourcePath)
            .pipe(ZLib.createGzip())
            .pipe(FS.createWriteStream(fileTargetPath))
            .on('close', () => resolve(fileTargetPath))
            .on('error', reject);
    });
}

/**
 * Checks if a path is a directory.
 *
 * @param {string} path
 * Path to check.
 *
 * @return {boolean}
 * `true`, if path is a directory.
 */
function isDirectory(
    path
) {
    return (
        FS.existsSync(path) &&
        FS.lstatSync(path).isDirectory()
    );
}

/**
 * Checks if a path contains a dot entry.
 *
 * @param {string} path
 * Path to check.
 *
 * @return {boolean}
 * `true`, if path contains a dot entry.
 */
function isDotEntry(
    path
) {
    return path
        .split(SEP)
        .every(entry => (
            entry === '..' ||
            entry.startsWith('.')
        ));
}


/**
 * Checks if a path is a file.
 *
 * @param {string} path
 * Path to check.
 *
 * @return {boolean}
 * `true`, if path is a file.
 */
function isFile(
    path
) {
    return (
        FS.existsSync(path) &&
        FS.lstatSync(path).isFile()
    );
}


/**
 * Extracts the last path item. Detects posix paths.
 *
 * @param {string} path
 * Path to extract from.
 *
 * @return {string}
 * Last path item.
 */
function lastPath(
    path
) {
    return (
        Path.sep !== Path.posix.sep &&
        path.includes(PSEP) &&
        path.split(PSEP).length > path.split(SEP).length ?
            Path.posix.basename(path) :
            Path.basename(path)
    );
}


/**
 * Creates a path, if it not exists.
 *
 * @param {string} path
 * Path to create.
 */
function makePath(
    path
) {

    if (Path.extname(path)) {
        path = Path.dirname(path);
    }

    FS.mkdirSync(path, { recursive: true });
}


/**
 * Moves all files of a directory.
 *
 * @param {string} directorySourcePath
 *        Directory to get files from.
 *
 * @param {string} directoryTargetPath
 *        Directory to move files to.
 *
 * @param {boolean} [includeSubDirectories]
 *        Set to true to copy files from sub-directories.
 *
 * @param {Function} [filterFunction]
 *        Return true to include a file, return a string to change the
 *        targetPath.
 *
 * @return {void}
 */
function moveAllFiles(
    directorySourcePath,
    directoryTargetPath,
    includeSubDirectories,
    filterFunction
) {
    const filePaths = getFilePaths(directorySourcePath, includeSubDirectories);

    if (filePaths.length === 0) {
        return;
    }

    const pathIndex = directorySourcePath.length;

    if (typeof filterFunction === 'function') {

        let targetPath, filterResult;
        filePaths.forEach(sourcePath => {

            targetPath = Path.join(
                directoryTargetPath, sourcePath.substr(pathIndex)
            );

            filterResult = filterFunction(sourcePath, targetPath);

            if (!filterResult) {
                return;
            }

            if (typeof filterResult === 'string') {
                copyFile(sourcePath, filterResult);
                deleteFile(sourcePath);
            } else {
                copyFile(sourcePath, targetPath);
                deleteFile(sourcePath);
            }
        });
    } else {
        filePaths.forEach(filePath => {
            copyFile(
                filePath,
                Path.join(directoryTargetPath, filePath.substring(pathIndex))
            );
            deleteFile(filePath);
        });
    }
}


/**
 * Normalize target file path based on source file path.
 *
 * @param {string} sourcePath
 * File path to use as reference for normalization.
 *
 * @param {string} targetPath
 * File path to normalize.
 *
 * @param {boolean} [toPosix]
 * Convert to a POSIX-uniform path, if set to `true`.
 *
 * @return {string}
 * Normalize target file path.
 */
function normalizePath(
    sourcePath,
    targetPath,
    toPosix
) {

    sourcePath = Path.posix.dirname(path(sourcePath, true));
    targetPath = path(targetPath, true);

    if (
        !targetPath.startsWith('./') &&
        !targetPath.startsWith('../')
    ) {
        targetPath = Path.posix.relative(sourcePath, targetPath);
    }

    return path(Path.posix.join(sourcePath, targetPath), toPosix);
}


/**
 * Extracts the upper path without the last path item. Detects posix paths.
 *
 * @param {string} path
 * Path to extract from.
 *
 * @return {string}
 * Upper parent path.
 */
function parentPath(
    path
) {
    return (
        Path.sep !== Path.posix.sep &&
        path.includes(PSEP) &&
        path.split(PSEP).length > path.split(SEP).length ?
            Path.posix.dirname(path) :
            Path.dirname(path)
    );
}


/**
 * Converts from POSIX path to the system-specific path by default. Set the flag
 * to convert to POSIX.
 *
 * @param {string|Array<string>} pathToConvert
 * Path to convert.
 *
 * @param {boolean} [toPosix]
 * Convert to a POSIX-uniform path, if set to `true`.
 *
 * @return {string}
 * Converted path.
 */
function path(
    pathToConvert,
    toPosix
) {

    if (Path.sep !== Path.posix.sep) {

        if (typeof pathToConvert !== 'string') {
            pathToConvert = Path.join(
                ...pathToConvert.map(ptc => path(ptc, toPosix))
            );
        }

        return (
            toPosix ?
                pathToConvert.replaceAll(SEP, PSEP) :
                pathToConvert.replaceAll(PSEP, SEP)
        );
    }

    if (typeof pathToConvert !== 'string') {
        pathToConvert = Path.join(...pathToConvert);
    }

    return pathToConvert;
}

/**
 * Set file content.
 *
 * @param {string} filePath
 * File path to write to.
 *
 * @param {string|*} [data]
 * UTF-8 content or JSON.
 */
function setFile(filePath, data) {

    if (typeof data !== 'string') {
        data = JSON.stringify(data, null, 4);
    }

    FS.writeFileSync(filePath, data, 'utf8');

}

/* *
 *
 *  Exports
 *
 * */


module.exports = {
    copyAllFiles,
    copyFile,
    deleteDirectory,
    deleteFile,
    getDirectoryHash,
    getDirectoryPaths,
    getFile,
    getFileHash,
    getFilePaths,
    gzipFile,
    isDirectory,
    isDotEntry,
    isFile,
    lastPath,
    makePath,
    moveAllFiles,
    normalizePath,
    parentPath,
    path,
    setFile
};
