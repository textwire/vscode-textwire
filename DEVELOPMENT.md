# Development

## With a Container Engine
If you use container engines like [Podman](https://podman.io/) or [Docker](https://www.docker.com/) it's a lot easier for you. You just need to have Podman or Docker installed on your machine.

### Build the Image
To build the image, run this command if you use Docker:
```bash
docker compose build
```
For Podman, run this:
```bash
podman-compose build
```

### Run the container
After the image is build, you can run a container from that image. Run this command if you use Docker:
```bash
docker compose up -d
```
For Podman, run this:
```bash
podman-compose up -d
```

### Enter the Container
To enter inside the container, run this command if you use Docker:
```bash
docker compose exec app sh
```
For Podman, run this:
```bash
podman-compose exec app sh
```

After you enter the container, you can use NPM scripts defined in [package.json](package.json) such as `npm run build` or `npm run watch`.

### Destroy the Container
You can destroy the container after you are done working by running this Docker command:
```bash
docker compose down
```
For Podman, run this:
```bash
podman-compose down
```