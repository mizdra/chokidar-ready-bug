## How to reproduce

```console
npm i
node main.ts 10
```

## Expected behavior

All add events are caught. The number of add events is 10. The order of events is non-deterministic.

```
File demo/dir-1/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-0/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
add event count: 10
```

## Actual behavior

- On macOS, the add event sometimes fails to occur.
  - When running `node main.ts 3` on a `MacBook Pro 2021 M1, macOS 26.1`, the issue reproduced 10 times out of 30.
  - This issue can be reproduced not only on physical machines but also on GitHub Actions' `macos-latest` runner.
- On other operating systems, it behaves as expected.

### MacBook Pro 2021 M1, macOS 26.1

Occasionally, the add event does not occur.

<details>
<summary>Logs:</summary>

```console
$ npx envinfo --system --binaries

  System:
    OS: macOS 26.1
    CPU: (10) arm64 Apple M1 Pro
    Memory: 787.08 MB / 32.00 GB
    Shell: 5.9 - /bin/zsh
  Binaries:
    Node: 25.2.1 - /Users/mizdra/.local/share/mise/installs/node/25.2.1/bin/node
    npm: 11.6.2 - /Users/mizdra/.local/share/mise/installs/node/25.2.1/bin/npm
    bun: 1.3.1 - /opt/homebrew/bin/bun
    Deno: 1.38.2 - /Users/mizdra/.deno/bin/deno
$ node main.ts 10
add event count: 0
$ node main.ts 10
add event count: 0
$ node main.ts 10
add event count: 0
$ node main.ts 10
add event count: 0
$ node main.ts 10
File demo/dir-0/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
File demo/dir-1/file.txt has been added
add event count: 10
```

</details>


### GitHub Actions `ubuntu-latest` runner

It always behaves as expected.

<details>
<summary>Logs:</summary>

```console
$ npx envinfo --system --binaries
npm warn exec The following package was not found and will be installed: envinfo@7.20.0
  System:
    OS: Linux 6.11 Ubuntu 24.04.3 LTS 24.04.3 LTS (Noble Numbat)
    CPU: (4) x64 AMD EPYC 7763 64-Core Processor
    Memory: 14.49 GB / 15.62 GB
    Container: Yes
    Shell: 5.2.21 - /bin/bash
  Binaries:
    Node: 25.2.1 - /opt/hostedtoolcache/node/25.2.1/x64/bin/node
    Yarn: 1.22.22 - /usr/local/bin/yarn
    npm: 11.6.2 - /opt/hostedtoolcache/node/25.2.1/x64/bin/npm
$ node main.ts 10
File demo/dir-0/file.txt has been added
File demo/dir-1/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-9/file.txt has been added
add event count: 10
$ node main.ts 10
File demo/dir-0/file.txt has been added
File demo/dir-1/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
add event count: 10
$ node main.ts 10
File demo/dir-0/file.txt has been added
File demo/dir-1/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
add event count: 10
$ node main.ts 10
File demo/dir-0/file.txt has been added
File demo/dir-1/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
add event count: 10
$ node main.ts 10
File demo/dir-0/file.txt has been added
File demo/dir-1/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
add event count: 10
```

</details>

### GitHub Actions `macos-latest` runner

Occasionally, the add event does not occur.

<details>
<summary>Logs:</summary>

```console
$ npx envinfo --system --binaries
npm warn exec The following package was not found and will be installed: envinfo@7.20.0

  System:
    OS: macOS 15.7.1
    CPU: (3) arm64 Apple M1 (Virtual)
    Memory: 302.97 MB / 7.00 GB
    Shell: 3.2.57 - /bin/bash
  Binaries:
    Node: 25.2.1 - /Users/runner/hostedtoolcache/node/25.2.1/arm64/bin/node
    Yarn: 1.22.22 - /Users/runner/.yarn/bin/yarn
    npm: 11.6.2 - /Users/runner/hostedtoolcache/node/25.2.1/arm64/bin/npm
$ node main.ts 10
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
File demo/dir-0/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-1/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
add event count: 10
$ node main.ts 10
File demo/dir-9/file.txt has been added
File demo/dir-0/file.txt has been added
File demo/dir-1/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
add event count: 10
$ node main.ts 10
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
add event count: 4
$ node main.ts 10
File demo/dir-1/file.txt has been added
File demo/dir-2/file.txt has been added
File demo/dir-3/file.txt has been added
File demo/dir-4/file.txt has been added
File demo/dir-5/file.txt has been added
File demo/dir-6/file.txt has been added
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
File demo/dir-0/file.txt has been added
add event count: 10
$ node main.ts 10
File demo/dir-7/file.txt has been added
File demo/dir-8/file.txt has been added
File demo/dir-9/file.txt has been added
add event count: 3
```

</details>

### GitHub Actions `windows-latest` runner

It always behaves as expected.

<details>
<summary>Logs:</summary>

```console
$ npx envinfo --system --binaries
npm warn exec The following package was not found and will be installed: envinfo@7.20.0

  System:
    OS: Windows 11 10.0.26100
    CPU: (4) x64 Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz
    Memory: 13.33 GB / 16.00 GB
  Binaries:
    Node: 25.2.1 - C:\hostedtoolcache\windows\node\25.2.1\x64\node.EXE
    Yarn: 1.22.22 - C:\npm\prefix\yarn.CMD
    npm: 11.6.2 - C:\hostedtoolcache\windows\node\25.2.1\x64\npm.CMD
$ node main.ts 10
File demo\dir-0\file.txt has been added
File demo\dir-1\file.txt has been added
File demo\dir-2\file.txt has been added
File demo\dir-3\file.txt has been added
File demo\dir-4\file.txt has been added
File demo\dir-5\file.txt has been added
File demo\dir-6\file.txt has been added
File demo\dir-7\file.txt has been added
File demo\dir-8\file.txt has been added
File demo\dir-9\file.txt has been added
add event count: 10
$ node main.ts 10
File demo\dir-0\file.txt has been added
File demo\dir-1\file.txt has been added
File demo\dir-2\file.txt has been added
File demo\dir-3\file.txt has been added
File demo\dir-4\file.txt has been added
File demo\dir-5\file.txt has been added
File demo\dir-6\file.txt has been added
File demo\dir-7\file.txt has been added
File demo\dir-8\file.txt has been added
File demo\dir-9\file.txt has been added
add event count: 10
$ node main.ts 10
File demo\dir-0\file.txt has been added
File demo\dir-1\file.txt has been added
File demo\dir-3\file.txt has been added
File demo\dir-2\file.txt has been added
File demo\dir-4\file.txt has been added
File demo\dir-5\file.txt has been added
File demo\dir-6\file.txt has been added
File demo\dir-7\file.txt has been added
File demo\dir-8\file.txt has been added
File demo\dir-9\file.txt has been added
add event count: 10
$ node main.ts 10
File demo\dir-0\file.txt has been added
File demo\dir-1\file.txt has been added
File demo\dir-2\file.txt has been added
File demo\dir-3\file.txt has been added
File demo\dir-4\file.txt has been added
File demo\dir-5\file.txt has been added
File demo\dir-6\file.txt has been added
File demo\dir-7\file.txt has been added
File demo\dir-8\file.txt has been added
File demo\dir-9\file.txt has been added
add event count: 10
$ node main.ts 10
File demo\dir-0\file.txt has been added
File demo\dir-1\file.txt has been added
File demo\dir-2\file.txt has been added
File demo\dir-4\file.txt has been added
File demo\dir-3\file.txt has been added
File demo\dir-5\file.txt has been added
File demo\dir-6\file.txt has been added
File demo\dir-7\file.txt has been added
File demo\dir-8\file.txt has been added
File demo\dir-9\file.txt has been added
add event count: 10
```

</details>
