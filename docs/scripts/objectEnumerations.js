// JavaScript Document

/*---------------------ObjectEnumerations-----------------------------\
| - Class to enumerate all of the different object types.
\--------------------------------------------------------------------*/

const typeEnum = Object.freeze(
{
	"type_entity":"type_entity",
	"type_moving_entity":"type_moving_entity",
    "type_shape":"type_shape",
    "type_shape_stand":"type_shape_stand",
	"type_gem_circle":"type_gem_circle",
	"type_gem_heart":"type_gem_heart",
	"type_gem_pentagon":"type_gem_pentagon",
	"type_gem_rectangle":"type_gem_rectangle",
	"type_gem_square":"type_gem_square",
	"type_gem_star":"type_gem_star",
    "type_gem_triangle":"type_gem_triangle",
    "type_luggage_yellow":"type_luggage_yellow",
    "type_luggage_red":"type_luggage_red",
    "type_luggage_blue":"type_luggage_blue",
    "type_luggage_green":"type_luggage_green",
    "type_luggage_purple":"type_luggage_purple",
    "type_plane_left_top":"type_plane_left_top",
    "type_plane_left_bottom":"type_plane_left_bottom",
    "type_plane_right_top":"type_plane_right_top",
    "type_plane_right_bottom":"type_plane_right_bottom",
    "type_cart_1":"type_cart_1",
    "type_cart_2":"type_cart_2",
    "type_cart_3":"type_cart_3",
    "type_cart_4":"type_cart_4"
});

/*---------------------getNameOfType----------------------------------\
| - Returns the name of a type as a string.
\--------------------------------------------------------------------*/
function getNameOfType(w) {
    var s;
    
    switch(w) {
        case typeEnum.type_entity:
            s = "Entity";
            break;
		case typeEnum.type_moving_entity:
            s = "MovingEntity";
            break;
		case typeEnum.type_shape:
            s = "Shape";
            break;
        case typeEnum.type_shape_stand:
            s = "ShapeStand";
            break;
        case typeEnum.type_gem_circle:
            s = "Circle";
            break;
        case typeEnum.type_gem_heart:
            s = "Heart";
            break;
        case typeEnum.type_gem_pentagon:
            s = "Pentagon";
            break;
        case typeEnum.type_gem_rectangle:
            s = "Rectangle";
            break;
        case typeEnum.type_gem_square:
            s = "Square";
            break;
        case typeEnum.type_gem_star:
            s = "Star";
            break;
        case typeEnum.type_gem_triangle:
            s = "Triangle";
            break;
        case typeEnum.type_luggage_blue:
            s = "LuggageBlue";
            break;
        case typeEnum.type_luggage_green:
            s = "LuggageGreen";
            break;
        case typeEnum.type_luggage_purple:
            s = "LuggagePurple";
            break;
        case typeEnum.type_luggage_red:
            s = "LuggageRed";
            break;
        case typeEnum.type_luggage_yellow:
            s = "LuggageYellow";
            break;
        case typeEnum.type_plane_left_top:
            s = "PlaneLeftTop";
            break;
        case typeEnum.type_plane_left_bottom:
            s = "PlaneLeftBottom";
            break;
        case typeEnum.type_plane_right_top:
            s = "PlaneRightTop";
            break;
        case typeEnum.type_plane_right_bottom:
            s = "PlaneRightBottom";
            break;
        case typeEnum.type_cart_1:
            s = "Cart1";
            break;
        case typeEnum.type_cart_2:
            s = "Cart2";
            break;
        case typeEnum.type_cart_3:
            s = "Cart3";
            break;
        case typeEnum.type_cart_4:
            s = "Cart4";
            break;
        default:
            s = "UNKNOWN OBJECT TYPE";
            break;
    }
    return s;
}

/*---------------------getTypeByName----------------------------------\
| - Returns the type for the privided name.
\--------------------------------------------------------------------*/
function getTypeByName(w) {
    var s;
    
    switch(w) {
		case "Entity":
            s = typeEnum.type_entity;
            break;
		case "MovingEntity":
            s = typeEnum.type_moving_entity;
            break;
        case "Shape":
            s = typeEnum.type_shape;
            break;
        case "ShapeStand":
            s = typeEnum.type_shape_stand;
            break;
        case "Circle":
            s = typeEnum.type_gem_circle;
            break;
        case "Heart":
            s = typeEnum.type_gem_heart;
            break;
        case "Pentagon":
            s = typeEnum.type_gem_pentagon;
            break;
        case "Rectangle":
            s = typeEnum.type_gem_rectangle;
            break;
        case "Square":
            s = typeEnum.type_gem_square;
            break;
        case "Star":
            s = typeEnum.type_gem_star;
            break;
        case "Triangle":
            s = typeEnum.type_gem_triangle;
            break;
        case "LuggageBlue":
            s = typeEnum.type_luggage_blue;
            break;
        case "LuggageGreen":
            s = typeEnum.type_luggage_green;
            break;
        case "LuggagePurple":
            s = typeEnum.type_luggage_purple;
            break;
        case "LuggageRed":
            s = typeEnum.type_luggage_red;
            break;
        case "LuggageYellow":
            s = typeEnum.type_luggage_yellow;
            break;
        case "PlaneLeftTop":
            s = typeEnum.type_plane_left_top;
            break;
        case "PlaneLeftBottom":
            s = typeEnum.type_plane_left_bottom;
            break;
        case "PlaneRightTop":
            s = typeEnum.type_plane_right_top;
            break;
        case "PlaneRightBottom":
            s = typeEnum.type_plane_right_bottom;
            break;
        case "Cart1":
            s = typeEnum.type_cart_1;
            break;
        case "Cart2":
            s = typeEnum.type_cart_2;
            break;
        case "Cart3":
            s = typeEnum.type_cart_3;
            break;
        case "Cart4":
            s = typeEnum.type_cart_4;
            break;
        default:
            s = "UNKNOWN OBJECT TYPE";
            break;
    }
    return s;
}