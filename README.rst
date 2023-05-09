
frontend-app-homepage
=================================

Welcome to the Homepage Microfrontend designed by EdSpirit! This project aims to fill the empty space of a user interface (UI) for the Open edX home page, providing a similar experience to the edx.org website.

The Homepage Microfrontend is designed to be easily integrated with your Open edX instance, offering a seamless and visually appealing UI for your learners. With this microfrontend, you can create a more engaging and user-friendly home page that will help attract and retain learners on your platform.

Features
========

- Responsive design that adapts to different screen sizes and devices
- Customizable layout and branding to match your organization's identity
- Easy integration with Open edX platform
- Built using modern web technologies for optimal performance and user experience


Getting Started
===============

To get started with the Homepage Microfrontend, follow these steps:

1. Clone the repository::

    git clone https://github.com/edspirit/homepage-microfrontend.git

2. Install the dependencies::

    cd homepage-microfrontend
    npm install

3. Configure the microfrontend to connect to your Open edX instance by updating the ``config.js`` file with the appropriate settings.

4. Build and run the microfrontend::

    npm run build
    npm start

5. Access the microfrontend in your browser at ``http://localhost:8080``.

For more detailed instructions and configuration options, please refer to the `documentation <https://github.com/edspirit/homepage-microfrontend/blob/main/docs/index.rst>`_.

Internationalization
====================

Please see `edx/frontend-platform's i18n module <https://edx.github.io/frontend-platform/module-Internationalization.html>`_ for documentation on internationalization.  The documentation explains how to use it, and the `How To <https://github.com/openedx/frontend-i18n/blob/master/docs/how_tos/i18n.rst>`_ has more detail.

we used weblate instead of transifex for storing translations. to download the latest translations:

1. export WEBLATE_TOKEN in your terminal or add it to `.bashrc` file (file name depends on you terminal). ask team members for the token value.

2. run `make pull_translations`. this will download and update `.json` files inside `srs/i18n/messages`

That's it.

Contributing
============

We welcome contributions to the Homepage Microfrontend project! If yo'd like to contribute, please follow the `contributing guidelines <https://github.com/edspirit/homepage-microfrontend/blob/main/CONTRIBUTING.rst>`_.

License
=======

The Homepage Microfrontend is released under the `Apache License, Version 2.0 <https://github.com/edspirit/homepage-microfrontend/blob/main/LICENSE>`_.
