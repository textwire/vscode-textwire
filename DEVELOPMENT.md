# Development

## Without a Container Engine
If you don't use container engines like [Podman](https://podman.io/) or [Docker](https://www.docker.com/), you need to do a little bit setup. You need to have [npm](https://www.npmjs.com/) package managers to run the commands.

## With a Container Engine
If you use container engines like [Podman](https://podman.io/) or [Docker](https://www.docker.com/) it's a lot easier for you. You just need to have Podman with Podman Compose or Docker with Docker Compose installed on your machine.

### Build the Image
To build the image, run this command:
```bash
docker compose build
# for Podman, run this:
podman-compose build
```

### Run the container
After the image is build, you can run a container from that image. Run this command:
```bash
docker compose up -d
# for Podman, run this:
podman-compose up -d
```

### Enter the Container
To enter inside the container, run this command:
```bash
docker compose exec app sh
# for Podman, run this:
podman-compose exec app sh
```

After you enter the container, you can use NPM scripts defined in [package.json](package.json) such as `npm run build` or `npm run watch`.

### Destroy the Container
You can destroy the container after you are done working by running this command:
```bash
docker compose down
# for Podman, run this:
podman-compose down
```