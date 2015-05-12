/**
 * Created by michal on 2015-05-11.
 */


function Product()
{
    this.price = 0;
    this.cena = 0;
}


Product.prototype.xyz = function ()
{
    console.log("ok")
};

new Product().a = 5;

console.log(new Product().price);
console.log(new Product().a);
