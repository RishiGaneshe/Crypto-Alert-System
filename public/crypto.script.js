const currentPath= window.location.pathname

if(currentPath === '/dashboard'){

    const socket = io('http://localhost:7000'); 

    socket.on('welcome', (data) => {
      console.log('Welcome message:', data.message);
    });

    socket.on('priceUpdate', (data) => {
      console.log('Price update received:', data);
      console.log(typeof data)

      const bitcoinPriceElement = document.getElementById('bitcoin-price');
      bitcoinPriceElement.textContent = `$${data.bitcoin.price}`;
      
      const ethereumPriceElement = document.getElementById('ethereum-price');
      ethereumPriceElement.textContent = `$${data.ethereum.price}`;
    });

    socket.emit('message', 'Hello from the client!');

}
