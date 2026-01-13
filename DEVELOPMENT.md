# Development

## With a Container Engine
### Build the Image
To build the image, run this command.

With Podman:
```bash
podman-compose build
```

With Docker:
```bash
docker compose build
```

### Run the container
After the image is build, you can run a container from that image.

With Podman:
```bash
podman-compose up -d
```

With Docker:
```bash
docker compose up -d
```

### Enter the Container
To enter inside the container:

With Podman:
```bash
podman-compose exec app sh
```

With Docker:
```bash
docker compose exec app sh
```

After you enter the container, you can use NPM scripts defined in [package.json](package.json) such as `npm run build` or `npm run watch`.

### Destroy the Container
You can destroy the container after you are done working.

With Podman:
```bash
podman-compose down
```

With Docker:
```bash
docker compose down
```
