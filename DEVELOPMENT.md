# Development

## With a Container Engine
> [!NOTE]
> If you use [🐳 Docker](https://app.docker.com/) instead of [🦦 Podman](https://podman.io/), just replace `podman-compose` with `docker compose`, and `podman` with `docker` in code examples below.

### Build the Image
To build the image, run this command:
```bash
podman-compose build
```

### Run the container
After the image is build, you can run a container from that image. Run this command:
```bash
podman-compose up -d
```

### Enter the Container
To enter inside the container, run this command:
```bash
podman-compose exec app sh
```

After you enter the container, you can use NPM scripts defined in [package.json](package.json) such as `npm run build` or `npm run watch`.

### Destroy the Container
You can destroy the container after you are done working by running this command:
```bash
podman-compose down
```
