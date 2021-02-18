const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
const EggToken = artifacts.require('EggToken.sol') 
const BirdFarm = artifacts.require('BirdFarm.sol'); 
const Migrator = artifacts.require('Migrator.sol');
const Timelock = artifacts.require('Timelock.sol');
const GovernorAlpha = artifacts.require('GovernorAlpha.sol');



module.exports = async function(deployer, network, addresses) {

    const [admin] = addresses;

  
  let weth,factory,router, usdt, usdc, dai,bird;

  let usdtlp = '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852';
  let dailp = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';
  let usdclp = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
  
  let birdlp = ''
  
  const dev1 = '0x44E967ddA79079805f684aAc7897943c3361596c';
  
  if(network == 'mainnet' || network == 'mainnet-fork'){
    console.log('mainet started...')
      
      weth = await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
      factory = await Factory.at('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f');
      router = await Router.at('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
      
  }else if(network == 'ropsten-fork' || network == 'ropsten') {
    console.log('ropsten started...')

    weth = await WETH.at('0xc778417e063141139fce010982780140aa0cd5ab');
    factory = await Factory.at('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f');
    router = await Router.at('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
   
    // await deployer.deploy(MockERC20,'BIRD', 'BIRD', web3.utils.toWei('1000000'));
    // bird = await MockERC20.deployed();
    bird = await MockERC20.at('0x56704aA00Fa292A8DC713aa165306359299c92F8')
    // await factory.createPair(weth.address, bird.address);
    birdlp = await factory.getPair(weth.address, bird.address);
    console.log('Bird lp address is ' + birdlp);
    

    // token = await MockERC20.at('0x348cb44dB721Bf62aF1428CCEe780f2bbC6FEeB8'); //already deployed
    // await deployer.deploy(MockERC20,'USDT', 'USDT', web3.utils.toWei('1000000'));
    // usdt = await MockERC20.deployed();
    // usdt = await MockERC20.at("0x679e58346Cb3F3930692d55CBaf82350C1E57aFB")
    // console.log('USDT address is ' + usdt.address);
    // await factory.createPair(weth.address, usdt.address);
    // usdtlp = await factory.getPair(weth.address, usdt.address);
    // console.log('USDT lp address is ' + usdtlp);
    
    // await deployer.deploy(MockERC20,'DAI', 'DAI', web3.utils.toWei('1000000'));
    // dai = await MockERC20.deployed();
    // dai = await MockERC20.at("0x67f43A60ebD2EA1A7a64Db8729DbB3f85F20315D")

    // console.log('DAI address is ' + dai.address);

    // await factory.createPair(weth.address, dai.address);
    // dailp = await factory.getPair(weth.address, dai.address);
    // console.log('DAI lp address is ' + dailp);
    
    // await deployer.deploy(MockERC20,'USDC', 'USDC', web3.utils.toWei('1000000'));
    // usdc = await MockERC20.deployed();
    // usdc = await MockERC20.at("0xFa14572Bc0C3343E2bB6251B53DC387E5f353F7c");
    // console.log('USDC address is ' + usdc.address);
    // await factory.createPair(weth.address, usdc.address);
    // usdclp = await factory.getPair(weth.address, usdc.address);
    // console.log('USDC lp address is ' + usdclp);
        
    // console.log('token address is ' + token.address);
  }else if(network == 'rinkeby-fork' || network == 'rinkeby') {
    console.log('rinkeby started...')

    weth = await WETH.at('0x2fcc4dba284dcf665091718e4d0dab53a416dfe7');
    factory = await Factory.at('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f');
    router = await Router.at('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');

    await deployer.deploy(MockERC20,'USDT', 'USDT', web3.utils.toWei('1000000'));
    usdt = await MockERC20.deployed();
    console.log('USDT address is ' + usdt.address);
    await factory.createPair(weth.address, usdt.address);
    usdtlp = await factory.getPair(weth.address, usdt.address);
    console.log('USDT lp address is ' + usdtlp);
    
    await deployer.deploy(MockERC20,'DAI', 'DAI', web3.utils.toWei('1000000'));
    dai = await MockERC20.deployed();
    console.log('DAI address is ' + dai.address);

    await factory.createPair(weth.address, dai.address);
    dailp = await factory.getPair(weth.address, dai.address);
    console.log('DAI lp address is ' + dailp);
    
    await deployer.deploy(MockERC20,'USDC', 'USDC', web3.utils.toWei('1000000'));
    usdc = await MockERC20.deployed();
    console.log('USDC address is ' + usdc.address);
    await factory.createPair(weth.address, usdc.address);
    usdclp = await factory.getPair(weth.address, usdc.address);
    console.log('USDC lp address is ' + usdclp);
    // token = await MockERC20.at('0x348cb44dB721Bf62aF1428CCEe780f2bbC6FEeB8'); //already deployed
    // await deployer.deploy(MockERC20,'Token', 'TK', web3.utils.toWei('1000000'));
    // token = await MockERC20.deployed();
    // console.log('token address is ' + token.address);
  }
  else{
    await deployer.deploy(WETH);
    weth = await WETH.deployed();
    await deployer.deploy(Factory, admin);
    factory = await Factory.deployed();
    await deployer.deploy(Router, factory.address, weth.address);
    router = await Router.deployed();
    await deployer.deploy(MockERC20,'Token', 'TK', web3.utils.toWei('1000000'));
    token = await MockERC20.deployed();
    //
  }

  await deployer.deploy(EggToken);
  const eggToken = await EggToken.deployed();
  // await eggToken.mint(admin, web3.utils.toWei('10000000'));

  await deployer.deploy(
    BirdFarm,
    eggToken.address,
    web3.utils.toWei('10000000'),
    web3.utils.toWei('0.5'),
    9318400,
    9318400
  );

  const birdFarm = await BirdFarm.deployed();

  // await deployer.deploy(Timelock,admin,'172800');
  // const timelock = await Timelock.deployed();

  // const gov = await deployer.deploy(GovernorAlpha, timelock.address, eggToken.address, dev1);
  
  
  const pair = await factory.createPair(weth.address, eggToken.address);
  const egglp = await factory.getPair(weth.address, eggToken.address);
  console.log('pair address is ' + JSON.stringify(egglp));
  // console.log('Timelock address is ' + timelock.address);

  // await birdFarm.add('1000', egglp, true);
  
  await birdFarm.add('1000', birdlp, false);//Bird

  // await birdFarm.add('1000', dailp , false);//DAI

  // await birdFarm.add('1000', usdclp, false);//USDC

  
  await eggToken.transferOwnership(birdFarm.address);
// await birdFarm.transferOwnership(timelock.address);
  console.log('Finished')
}