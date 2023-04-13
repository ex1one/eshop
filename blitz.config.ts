/* eslint-disable no-process-env */
import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized, MiddlewareRequest } from "blitz"
import SentryWebpackPlugin from "@sentry/webpack-plugin"
// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting

// Use the SentryWebpack plugin to upload the source maps during build step
const {
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  RENDER_GIT_COMMIT,
} = process.env

const COMMIT_SHA = VERCEL_GITHUB_COMMIT_SHA || RENDER_GIT_COMMIT

const config: BlitzConfig = {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: "eshop",
      isAuthorized: simpleRolesIsAuthorized,
    }),
    // (req, res, next) => {
    //   let req2 = req as any
    //   console.log("ENV", process.env.NODE_ENV)
    //   console.log("http middleware", req.headers)
    //   let redTo = "https://" + req.headers..host + req.url
    //   console.log("redicrecting to ", redTo)
    //   req.socket
    //     // if (
    //     //   // !req.secure &&
    //     //   // req.get("x-forwarded-proto") !== "https" &&
    //     //   process.env.NODE_ENV !== "development"
    //     //   && req.sec
    //     // ) {
    //     //   console.log("redirecting to https")
    //     //   res.redirect("https://" + req2.get("host") + req2.url)
    //     //   return
    //     // }
    //     .next()
    // },
  ],

  webpack: (config, { isServer }) => {
    // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
    // @sentry/node will run in a Node.js environment. @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser"
    }

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === "production"
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules"],
          stripPrefix: ["webpack://_N_E/"],
          urlPrefix: `~/_next`,
          release: COMMIT_SHA,
        })
      )
    }

    return config
  },
}
module.exports = config
