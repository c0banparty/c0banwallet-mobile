#!/bin/bash

sencha app build native
docker build -t mobilewallet .
