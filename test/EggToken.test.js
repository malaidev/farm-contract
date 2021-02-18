const { expectRevert } = require('@openzeppelin/test-helpers');
const EggToken = artifacts.require('EggToken');

contract('EggToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.egg = await EggToken.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.egg.name();
        const symbol = await this.egg.symbol();
        const decimals = await this.egg.decimals();
        assert.equal(name.valueOf(), 'EggToken');
        assert.equal(symbol.valueOf(), 'EGG');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should only allow owner to mint token', async () => {
        await this.egg.mint(alice, '100', { from: alice });
        await this.egg.mint(bob, '1000', { from: alice });
        await expectRevert(
            this.egg.mint(carol, '1000', { from: bob }),
            'Ownable: caller is not the owner',
        );
        const totalSupply = await this.egg.totalSupply();
        const aliceBal = await this.egg.balanceOf(alice);
        const bobBal = await this.egg.balanceOf(bob);
        const carolBal = await this.egg.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.egg.mint(alice, '100', { from: alice });
        await this.egg.mint(bob, '1000', { from: alice });
        await this.egg.transfer(carol, '10', { from: alice });
        await this.egg.transfer(carol, '100', { from: bob });
        const totalSupply = await this.egg.totalSupply();
        const aliceBal = await this.egg.balanceOf(alice);
        const bobBal = await this.egg.balanceOf(bob);
        const carolBal = await this.egg.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.egg.mint(alice, '100', { from: alice });
        await expectRevert(
            this.egg.transfer(carol, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.egg.transfer(carol, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
