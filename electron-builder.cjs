// @ts-check

// needed for RPM building on Fedora 41+
process.env.USE_SYSTEM_FPM = "true";

/** @type {import('app-builder-lib').Configuration} */
module.exports = {
  appId: "com.example.app",
  asar: false,
  files: ["dist/**/*"],
  directories: {
    output: "out",
  },
  linux: {
    target: ["AppImage", "deb", "snap", "zip", "tar.xz"/*, "rpm" */],
    category: "Utility",
  },
  win: {
    target: ["nsis", "zip"],
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
  },
  electronLanguages: ["en-US"],
};
