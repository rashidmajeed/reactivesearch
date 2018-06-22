# url-parser-lite
URL Parser < 1kB (360 bytes) :fire: for ALL JavaScript environments

## Installation

```
yarn add url-parser-lite
```

or 

```
npm i url-parser-lite
```

## Usage

```
import URL from 'url-parser-lite';

const parsedURL = URL('https://username:pa$$w0rd@github.com/metagrover?repos=21#readme');

// returns
{
    protocol: "https"
    auth: "username:pa$$w0rd"
    host: "github.com"
    path: "/metagrover"
    hash: "readme"
    query: "repos=21"
}
```

## Based on

This project is based on [this stackoverflow answer](https://stackoverflow.com/a/6168286/5010845) with some added sauce :lollipop:
