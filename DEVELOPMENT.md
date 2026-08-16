# Development

## With a Container Engine
### Build the Image
To build the image, run this command.

```bash
podman-compose build
```

### Install Dependencies
Install `node_modules` inside the container and make them available on the host machine.

```bash
podman-compose run --rm app npm i
```

### Run the container
After the image is build, you can run a container from that image.

```bash
podman-compose up -d
```

### Enter the Container
To enter inside the container:

```bash
podman-compose exec app sh
```

After you enter the container, you can use NPM scripts defined in [package.json](package.json) such as `npm run build` or `npm run watch`.

### Destroy the Container
You can destroy the container after you are done working.

```bash
podman-compose down
```
