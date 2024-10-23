/**
 * Represents a collectable object and defines its x value: a random number between 200 (incl.) and 2000 (excl.).
 */
class CollectableObject extends DrawableObject {
    
    x = Math.floor(Math.random() * (2000 - 200)) + 200;
    
}