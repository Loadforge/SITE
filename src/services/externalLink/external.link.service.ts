export class ExternalLinkService {
  static openInNewTab(url: string) {
    if (!url.startsWith("http")) {
      console.warn("Invalid external URL:", url);
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  static reportBug() {
    this.openInNewTab("https://github.com/Loadforge/SITE/issues/new");
  }

  static openDocs() {
    this.openInNewTab("https://github.com/loadforge/docs");
  }
}
