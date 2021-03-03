class Color {
  static get list() {
    return [
      { color: 'red', code: '\u001b[31;1m' },
      { color: 'green', code: '\u001b[32;1m' },
      { color: 'reset', code: '\u001b[37;1m' }
    ];
  };

  static get banner() {
    const banner = `
    ________  .__                __________        __   
    \\______ \\ |__| ____ ______   \\______   \\ _____/  |_ 
     |    |  \\|  |/ __ \\\\____ \\   |    |  _//  _ \\   __\\
     |    \`   \\  \\  ___/|  |_> >  |    |   (  <_> )  |  
    /_______  /__|\\___  >   __/   |______  /\\____/|__|  
            \\/        \\/|__|             \\/             
  =======================================================
    `;

    return this.list[1].code + banner + this.list[2].code;
  };

  static style(number) {
    const color = this.list[number].code;
    return `${color}[${this.list[2].code}>${color}] `;
  };

  static log(string = '', linebreak = true, index = 1) {
    if (linebreak == true) {
      process.stdout.write(
        this.style(index) + string + this.list[2].code + '\n'
      );

      return;
    };

    process.stdout.write(
      this.style(index) + string + this.list[2].code
    );
  };
};

module.exports.Color = Color;