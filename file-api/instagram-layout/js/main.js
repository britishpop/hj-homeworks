const addClass = ( className, context ) => context.classList.add( className ),
  removeClass = ( className, context ) => context.classList.remove( className ),
  hasClass = ( className, context ) => context.classList.contains( className );
class iLayout {
  constructor( container ) {
    this.container = container;
    this.positionsContainer = container.querySelector( '.layout__positions' );
    this.actionButton = container.querySelector( '.layout__button' );
    this.result = container.querySelector( '.layout__result' );
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.positionsContainer.getBoundingClientRect().width;
    this.canvas.height = this.positionsContainer.getBoundingClientRect().height;
    this.ctx = this.canvas.getContext('2d');

    this.registerEvents();
  }
  registerEvents() {
    this.positionsContainer.addEventListener('dragover', event => {
      event.preventDefault();
      event.target.classList.add('layout__item_active');
    });

    this.positionsContainer.addEventListener('dragleave', () => event.target.classList.remove('layout__item_active'));

    this.positionsContainer.addEventListener('drop', event => {
      event.preventDefault();
      event.target.innerHTML = '';
      const file = event.dataTransfer.files[0];
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.classList.add('layout__image');
      event.target.appendChild(img);
      event.target.classList.remove('layout__item_active');

      const dwidth = event.target.getBoundingClientRect().width;
      const dheight = event.target.getBoundingClientRect().height;
      let dx = event.target.offsetLeft, dy = 0;
      if (event.target.classList.contains('layout__item_bottom')) {
        dy = event.target.offsetHeight;
      }

      img.addEventListener('load', event => {
        this.ctx.drawImage(img, 0, 0, dwidth, dheight, dx, dy, dwidth, dheight);
        URL.revokeObjectURL(img.src);
      })
    });

    this.actionButton.addEventListener('click', event => {
      event.preventDefault();
      this.result.value = `<img src="${this.canvas.toDataURL()}">`;
    })
  }
}

new iLayout( document.getElementById( 'layout' ));
