/**
 * @file workbox-build config
 * @desc These options will be passed to workbox-webpack-plugin.
 * Some other options such as `cacheId` and `skipWaiting`
 * need to be passed directly to WorkboxSW() constructor defined in core/service-worker.js.
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

const path = require('path');
const build = require('./build');

module.exports = {
    /**
     * The path to the source service worker
     * containing a `precache([])` placeholder, which will be replaced with the
     * precache manifest generated by the build.
     *
     * @type {string} swSrc
     */
    swSrc: path.join(__dirname, '../core/service-worker.js'),

    /**
     * The path to the final service worker
     * file that will be created by the build process, relative to the current
     * working directory.
     *
     * @type {string} swDest
     */
    swDest: path.join(build.path, 'service-worker.js'),

    /**
     * The base directory you wish to match `globPatterns` against.
     *
     * @type {string} globDirectory
     */
    globDirectory: path.basename(build.path),

    /**
     * Files matching against any of these
     * [glob patterns](https://github.com/isaacs/node-glob) will be included in the
     * precache manifest.
     *
     * @type {Array.<string>} globPatterns
     */
    globPatterns: [
        '**/*.{html,js,css,eot,svg,ttf,woff}'
    ],

    /**
     * Files matching against any of these glob patterns will be excluded from the
     * file manifest, overriding any matches from `globPatterns`.
     *
     * @type {Array.<string>} globIgnores
     */
    globIgnores: [
        'sw-register.js',
        '**/*.map',
        'node_modules/*',
        'server/*'
    ],

    /**
     * If a URL is rendered generated based on some server-side logic, its contents
     * may depend on multiple files or on some other unique string value.
     * All the filepath are relative to `globDirectory`.
     */
    templatedUrls: {},

    /**
     * This value can be used to determine the maximum size of files that will be
     * precached. This prevents you from inadvertantly precaching very large files
     * that might have been accidentally match your `globPatterns` values.
     *
     * @type {number} maximumFileSizeToCacheInBytes
     */
    // maximumFileSizeToCacheInBytes: 2097152,

    /**
     * An array of manifest transformations, which will be applied sequentially against the
     * generated manifest. If `modifyUrlPrefix` or `dontCacheBustUrlsMatching` are
     * also specified, their corresponding transformations will be applied first.
     *
     * @type {Array<ManifestTransform>} manifestTransforms
     */
    // manifestTransforms: [],

    /**
     * A mapping of prefixes that, if present in an entry in the precache manifest, will be
     * replaced with the corresponding value.
     * As an alternative with more flexibility, you can use the `manifestTransforms`
     * option and provide a function that modifies the entries in the manifest using
     * whatever logic you provide.
     *
     * E.g.
     * ```js
     * {
     *   '/prefix-to-remove': '',
     * }
     * ```
     *
     * @type {Object<String,String>} modifyUrlPrefix
     */
    //  modifyUrlPrefix: {},

    /**
     * Assets that match this regex will be assumed to be uniquely versioned via their URL,
     * an exempted from the normal HTTP cache-busting that's done when populating the precache.
     *
     * While not required, it's recommended that if your existing build process
     * already inserts a `[hash]` value into each filename, you provide a RegExp
     * that will detect those values, as it will reduce the amount of bandwidth
     * consumed when precaching.
     *
     * E.g. `/\.\w{8}\./`
     *
     * @type {RegExp} dontCacheBustUrlsMatching
     */
    dontCacheBustUrlsMatching: /\.\w{8}\./
};