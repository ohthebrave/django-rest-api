# Build a Django Rest Api with Django Rest Framework
A guide to building a Django Rest Api using the Python web framework Django. Django REST framework is a powerful and flexible toolkit for building Web APIs.

## Setting up the developer environment

### GitBash
Installing GitBash is quick and fast, below is the download link and instructions on how to install
Visit [this link](https://code.visualstudio.com/download) and download the one for Windows 

### WSL
This installation needs more time to set up because it might require you to change some bios settings of your machine. 
Use [this link](https://github.com/nvm-sh/nvm#:~:text=windows%20WSL.-,Installing%20and%20Updating,-Install%20%26%20Update%20Script) to do the installation.

> Note: You only need to install one of the above and only if you are using Windows OS

Setting up IDE
We recommend using Visual Studio Code as your IDE.
Download and install it from [here](https://code.visualstudio.com/download).


	
## Backend Development Environment
We will be  using Python Django Framework for our backend development so, we need to install python3.10.8
Before installing, first confirm if it is already installed using this command

### Requirements

* Django 4.2,4.1,4.0,3.2,3.1,3.0

```
python3 –version

// Outputs
// Python 3.10.x
```

If you do not see the output outlined in the code block above, it means you do not have Python installed and so,you need to install it.
```
Installing Python

sudo apt update -y \
sudo apt install software-properties-common \
sudo add-apt-repository ppa:deadsnakes/ppa \
sudo apt update \
sudo apt install python3.10.2

//confirm if it is installed
python3 --version

// Outputs
// Python 3.10.x 
```
### Installation

Installing PIP for managing Python packages
Python uses pip to manage packages like Django, Django Rest which we will be using for our backend.

```
sudo apt install python3-pip
```

- Install using pip...

 pip install djangorestframework

Add 'rest_framework' to your INSTALLED_APPS setting.

INSTALLED_APPS = [
    ...
    'rest_framework',
]

