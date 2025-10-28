import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/froststrap-logo.png";
import background from "@/assets/background.png";

interface ReleaseData {
  version: string;
  latestDownloads: number;
}

interface RepoStats {
  license: string;
  totalDownloads: number;
}

export default function Home() {
  const [releaseData, setReleaseData] = useState<ReleaseData>({
    version: "loading...",
    latestDownloads: 0,
  });
  const [repoStats, setRepoStats] = useState<RepoStats>({
    license: "...",
    totalDownloads: 0,
  });

  // new state for download action
  const [isDownloading, setIsDownloading] = useState(false);

  // repo constants moved to component scope so handler and effect can use them
  const repoOwner = "RealMeddsam";
  const repoName = "Froststrap";
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    // Fetch latest release
    fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`,
      {
        headers: {
          Authorization: `${GITHUB_TOKEN}`,
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const version = data.tag_name || "latest";
        let latestDownloadCount = 0;
        if (data.assets && data.assets.length) {
          latestDownloadCount = data.assets.reduce(
            (acc: number, asset: { download_count?: number }) =>
              acc + (asset.download_count || 0),
            0
          );
        }
        setReleaseData({ version, latestDownloads: latestDownloadCount });
      })
      .catch(() => {
        setReleaseData({ version: "unknown", latestDownloads: 0 });
      });

    // Fetch repo info and all releases
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
      headers: {
        Authorization: `${GITHUB_TOKEN}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const license = data.license?.spdx_id || "Unknown";
        setRepoStats((prev) => ({ ...prev, license }));
        return fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/releases`
        );
      })
      .then((res) => res.json())
      .then((releases) => {
        let totalDownloads = 0;
        releases.forEach(
          (release: { assets: { download_count: number }[] }) => {
            if (release.assets && release.assets.length) {
              totalDownloads += release.assets.reduce(
                (acc: number, asset: { download_count?: number }) =>
                  acc + (asset.download_count || 0),
                0
              );
            }
          }
        );
        setRepoStats((prev) => ({ ...prev, totalDownloads }));
      })
      .catch(() => {
        setRepoStats((prev) => ({ ...prev, license: "Unknown" }));
      });
  }, [GITHUB_TOKEN]);

  // Get latest release
  const handleDownloadLatest = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`,
        {
          headers: {
            Authorization: `${GITHUB_TOKEN}`,
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch latest release");
      const data = await res.json();
      const assets = data.assets || [];
      const exeAsset = assets.find(
        (a: { name?: string }) =>
          a.name && a.name.toLowerCase().endsWith(".exe")
      );
      if (!exeAsset) {
        alert("No .exe asset found for the latest release.");
        setIsDownloading(false);
        return;
      }
      const downloadUrl: string = exeAsset.browser_download_url;
      window.location.assign(downloadUrl);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to download the latest release. Check console for details."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen text-foreground overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(8px)",
            transform: "scale(1.03)",
          }}
        />

        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-6">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src={logo} alt="Froststrap" className="h-10 w-10" />
              <span className="font-bold text-xl">Froststrap</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                <a
                  href="https://github.com/RealMeddsam/Froststrap"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    style={{ fill: "#FFFFFF" }}
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                <a
                  href="https://discord.gg/BeCRubaU"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    height="24"
                    width="24"
                    viewBox="0 0 512 365.467"
                  >
                    <path
                      fill="#fff"
                      d="M378.186 365.028s-15.794-18.865-28.956-35.099c57.473-16.232 79.41-51.77 79.41-51.77-17.989 11.846-35.099 20.182-50.454 25.885-21.938 9.213-42.997 14.917-63.617 18.866-42.118 7.898-80.726 5.703-113.631-.438-25.008-4.827-46.506-11.407-64.494-18.867-10.091-3.947-21.059-8.774-32.027-14.917-1.316-.877-2.633-1.316-3.948-2.193-.877-.438-1.316-.878-1.755-.878-7.898-4.388-12.285-7.458-12.285-7.458s21.06 34.659 76.779 51.331c-13.163 16.673-29.395 35.977-29.395 35.977C36.854 362.395 0 299.218 0 299.218 0 159.263 63.177 45.633 63.177 45.633 126.354-1.311 186.022.005 186.022.005l4.388 5.264C111.439 27.645 75.461 62.305 75.461 62.305s9.653-5.265 25.886-12.285c46.945-20.621 84.236-25.885 99.592-27.64 2.633-.439 4.827-.878 7.458-.878 26.763-3.51 57.036-4.387 88.624-.878 41.68 4.826 86.43 17.111 132.058 41.68 0 0-34.66-32.906-109.244-55.281l6.143-7.019s60.105-1.317 122.844 45.628c0 0 63.178 113.631 63.178 253.585 0-.438-36.854 62.739-133.813 65.81l-.001.001zm-43.874-203.133c-25.006 0-44.75 21.498-44.75 48.262 0 26.763 20.182 48.26 44.75 48.26 25.008 0 44.752-21.497 44.752-48.26 0-26.764-20.182-48.262-44.752-48.262zm-160.135 0c-25.008 0-44.751 21.498-44.751 48.262 0 26.763 20.182 48.26 44.751 48.26 25.007 0 44.75-21.497 44.75-48.26.439-26.763-19.742-48.262-44.75-48.262z"
                    />
                  </svg>
                </a>
              </Button>
              <div className="h-6 w-px bg-border" />
              <Link
                to="/"
                className="text-white visited:text-white hover:text-white focus:text-white text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                Home
              </Link>
              <Link
                to="/docs/faq"
                className="text-white visited:text-white hover:text-white focus:text-white text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                FAQ
              </Link>
              <Link
                to="/docs"
                className="text-white visited:text-white hover:text-white focus:text-white text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                Wiki
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-16">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center space-y-6 mb-16">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Froststrap Logo"
                className="h-16 w-16 md:h-20 md:w-20"
              />
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Froststrap
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A fork of Bloxstrap / Fishstrap — lightweight, customizable, and
              open source.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={handleDownloadLatest}
                size="lg"
                className="flex items-center gap-2"
                disabled={isDownloading}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.25 20.5h13.498a.75.75 0 0 1 .101 1.493l-.101.007H5.25a.75.75 0 0 1-.102-1.494l.102-.006h13.498H5.25Zm6.633-18.498L12 1.995a1 1 0 0 1 .993.883l.007.117v12.59l3.294-3.293a1 1 0 0 1 1.32-.083l.094.084a1 1 0 0 1 .083 1.32l-.083.094-4.997 4.996a1 1 0 0 1-1.32.084l-.094-.083-5.004-4.997a1 1 0 0 1 1.32-1.498l.094.083L11 15.58V2.995a1 1 0 0 1 .883-.993L12 1.995l-.117.007Z"
                    fill="#fff"
                  />
                </svg>
                {isDownloading
                  ? "Downloading..."
                  : `Download Latest (${releaseData.version})`}
              </Button>

              <Button asChild size="lg" variant="secondary" className="gap-2">
                <a
                  href="https://github.com/RealMeddsam/Froststrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="250"
                    height="250"
                    viewBox="0 0 30 30"
                    style={{ fill: "#FFFFFF" }}
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  Star on GitHub
                </a>
              </Button>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://github.com/RealMeddsam/Froststrap/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors"
              >
                License:{" "}
                <span className="font-semibold text-primary">
                  {repoStats.license}
                </span>
              </a>
              <a
                href="https://github.com/RealMeddsam/Froststrap/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors"
              >
                Latest Downloads:{" "}
                <span className="font-semibold text-primary">
                  {releaseData.latestDownloads.toLocaleString()}
                </span>
              </a>
              <a
                href="https://github.com/RealMeddsam/Froststrap"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors"
              >
                Total Downloads:{" "}
                <span className="font-semibold text-primary">
                  {repoStats.totalDownloads.toLocaleString()}
                </span>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="w-6 h-6 fill-white flex-shrink-0"
                >
                  <path d="M17.22 8.687a1.498 1.498 0 0 1 0 2.626l-5.23 2.876a5.5 5.5 0 0 0-.16-1.052l4.908-2.7a.5.5 0 0 0 0-.875L6.74 4.063a.5.5 0 0 0-.742.438v4.521a5.5 5.5 0 0 0-1 .185V4.501a1.5 1.5 0 0 1 2.224-1.313zM4.065 11.442a2 2 0 0 1-1.43 2.478l-.462.118a4.7 4.7 0 0 0 .01 1.016l.35.083a2 2 0 0 1 1.456 2.519l-.127.422q.388.307.835.518l.325-.344a2 2 0 0 1 2.91.002l.337.358q.44-.203.822-.498l-.156-.556a2 2 0 0 1 1.43-2.479l.46-.117a4.7 4.7 0 0 0-.01-1.017l-.348-.082a2 2 0 0 1-1.456-2.52l.126-.421a4.3 4.3 0 0 0-.835-.519l-.325.344a2 2 0 0 1-2.91-.001l-.337-.358a4.3 4.3 0 0 0-.821.497zM6.499 15.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2" />
                </svg>

                <div>
                  <h3 className="text-xl font-semibold mb-1 text-card-foreground">
                    Bootstrapper
                  </h3>
                  <p className="text-muted-foreground">
                    Lightweight launcher for Roblox with enhanced customization.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.75 2.001a5.25 5.25 0 0 0-5.005 6.84l-9.068 9.38a2.344 2.344 0 1 0 3.37 3.257l8.963-9.272A5.25 5.25 0 0 0 21.797 5.8a.75.75 0 0 0-1.25-.323L17.36 8.66l-2.06-2.06 3.16-3.162a.75.75 0 0 0-.333-1.254 5.255 5.255 0 0 0-1.378-.183Z"
                    fill="#fff"
                  />
                </svg>

                <div>
                  <h3 className="text-xl font-semibold mb-1 text-card-foreground">
                    Mod Generator
                  </h3>
                  <p className="text-muted-foreground">
                    Easily generate mods to use for Roblox UI.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 2v3.252a.75.75 0 0 0 1.5 0V2h1v4.251a.75.75 0 0 0 1.5 0V2h1.75a.75.75 0 0 1 .75.75V11H5V2.75A.75.75 0 0 1 5.75 2h6.75ZM5 12.5v1.752a2.25 2.25 0 0 0 2.25 2.25H10V20a2 2 0 1 0 4 0v-3.498h2.75a2.25 2.25 0 0 0 2.25-2.25V12.5H5Z"
                    fill="#ffffff"
                  />
                </svg>

                <div>
                  <h3 className="text-xl font-semibold mb-1 text-card-foreground">
                    UI & Appearance
                  </h3>
                  <p className="text-muted-foreground">
                    Customize UI with Custom Animated/Gradient backgrounds.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m10.946 2.047.005.007C11.296 2.018 11.646 2 12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10a9.983 9.983 0 0 1-7.896-3.862h-.003v-.003A9.957 9.957 0 0 1 2 12c0-5.162 3.911-9.41 8.932-9.944l.014-.009ZM12 3.5l-.16.001c.123.245.255.533.374.85.347.923.666 2.282.1 3.487-.522 1.113-1.424 1.4-2.09 1.573l-.084.021c-.657.17-.91.235-1.093.514-.17.257-.144.582.061 1.25l.046.148c.082.258.18.57.23.863.064.364.082.827-.152 1.275a2.187 2.187 0 0 1-.9.945c-.341.185-.694.256-.958.302l-.093.017c-.515.09-.761.134-1 .39-.187.2-.307.553-.377 1.079-.029.214-.046.427-.064.646l-.01.117c-.02.242-.044.521-.099.76v.002a8.478 8.478 0 0 0 6.27 2.76c1.576 0 3.053-.43 4.319-1.178a4.47 4.47 0 0 1-.31-.35c-.34-.428-.786-1.164-.631-2.033.074-.418.298-.768.515-1.036a7.12 7.12 0 0 1 .72-.74l.158-.146c.179-.163.33-.301.46-.437.172-.18.21-.262.212-.267.068-.224-.015-.384-.106-.454a.304.304 0 0 0-.19-.061c-.084 0-.22.024-.401.14a.912.912 0 0 1-.836.085 1.025 1.025 0 0 1-.486-.432c-.144-.237-.225-.546-.278-.772-.04-.174-.08-.372-.115-.553l-.04-.206a4.127 4.127 0 0 0-.134-.54l-.02-.037a1.507 1.507 0 0 0-.064-.105 6.233 6.233 0 0 0-.227-.317l-.11-.143a12.686 12.686 0 0 1-.516-.712c-.196-.298-.417-.688-.487-1.104a1.46 1.46 0 0 1 .055-.734c.094-.264.265-.482.487-.649.483-.362 1.193-1.172 1.823-1.959.288-.359.544-.695.736-.95A8.46 8.46 0 0 0 12 3.5Z"
                    fill="#ffffff"
                  />
                </svg>

                <div>
                  <h3 className="text-xl font-semibold mb-1 text-card-foreground">
                    Region Selector
                  </h3>
                  <p className="text-muted-foreground">
                    Choose your preferred server region for optimal ping.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 12a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm.011 2-.084.005-.055.012-.083.03-.074.042-.056.045-2.513 2.512-.057.07a.5.5 0 0 0 0 .568l.057.07.07.057a.5.5 0 0 0 .568 0l.07-.057 1.645-1.646L17 21l.008.09a.5.5 0 0 0 .402.402l.09.008.09-.008a.5.5 0 0 0 .402-.402L18 21l-.001-5.294 1.647 1.648.07.057a.5.5 0 0 0 .695-.695l-.057-.07-2.548-2.542-.047-.032-.068-.034-.063-.021-.054-.011A.5.5 0 0 0 17.51 14ZM6.25 3h11.5a3.25 3.25 0 0 1 3.245 3.066L21 6.25l.001 5.773a6.463 6.463 0 0 0-2-.849L19 8H5v9.75c0 .647.492 1.18 1.122 1.244L6.25 19h4.924c.17.721.46 1.396.849 2.001L6.25 21a3.25 3.25 0 0 1-3.245-3.066L3 17.75V6.25a3.25 3.25 0 0 1 3.066-3.245L6.25 3Z"
                    fill="#ffffff"
                  />
                </svg>

                <div>
                  <h3 className="text-xl font-semibold mb-1 text-card-foreground">
                    Game Shortcuts
                  </h3>
                  <p className="text-muted-foreground">
                    Create shortcuts to use to join specific games faster.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  height="24"
                  width="24"
                  viewBox="0 0 512 365.467"
                >
                  <path
                    fill="#fff"
                    d="M378.186 365.028s-15.794-18.865-28.956-35.099c57.473-16.232 79.41-51.77 79.41-51.77-17.989 11.846-35.099 20.182-50.454 25.885-21.938 9.213-42.997 14.917-63.617 18.866-42.118 7.898-80.726 5.703-113.631-.438-25.008-4.827-46.506-11.407-64.494-18.867-10.091-3.947-21.059-8.774-32.027-14.917-1.316-.877-2.633-1.316-3.948-2.193-.877-.438-1.316-.878-1.755-.878-7.898-4.388-12.285-7.458-12.285-7.458s21.06 34.659 76.779 51.331c-13.163 16.673-29.395 35.977-29.395 35.977C36.854 362.395 0 299.218 0 299.218 0 159.263 63.177 45.633 63.177 45.633 126.354-1.311 186.022.005 186.022.005l4.388 5.264C111.439 27.645 75.461 62.305 75.461 62.305s9.653-5.265 25.886-12.285c46.945-20.621 84.236-25.885 99.592-27.64 2.633-.439 4.827-.878 7.458-.878 26.763-3.51 57.036-4.387 88.624-.878 41.68 4.826 86.43 17.111 132.058 41.68 0 0-34.66-32.906-109.244-55.281l6.143-7.019s60.105-1.317 122.844 45.628c0 0 63.178 113.631 63.178 253.585 0-.438-36.854 62.739-133.813 65.81l-.001.001zm-43.874-203.133c-25.006 0-44.75 21.498-44.75 48.262 0 26.763 20.182 48.26 44.75 48.26 25.008 0 44.752-21.497 44.752-48.26 0-26.764-20.182-48.262-44.752-48.262zm-160.135 0c-25.008 0-44.751 21.498-44.751 48.262 0 26.763 20.182 48.26 44.751 48.26 25.007 0 44.75-21.497 44.75-48.26.439-26.763-19.742-48.262-44.75-48.262z"
                  />
                </svg>

                <div>
                  <h3 className="text-xl font-semibold mb-1 text-card-foreground">
                    Froststrap RPC
                  </h3>
                  <p className="text-muted-foreground">
                    Froststrap Rich Presence that also tracks the page you're
                    on.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Credits */}
          <div className="text-center mt-16 text-muted-foreground">
            Founder & Developer:{" "}
            <span className="font-semibold text-foreground">Meddsam</span>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-center text-sm text-muted-foreground py-6">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Froststrap, MIT License.
          </p>
        </footer>
      </div>
    </>
  );
}
