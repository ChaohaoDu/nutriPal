import React, {useState} from 'react';

const MealEntry = ({dish, onDelete, onEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMeal, setEditedMeal] = useState(dish.name);

    const handleEdit = () => {
        setIsEditing(true);
    };


    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleMealChange = (e) => {
        setEditedMeal(e.target.value);
    };

    const handleGramsChange = (e) => {
        // setEditedGrams(e.target.value);
    };

    return (
        <div className="meal-entry">
            <span>{dish.id}</span> {   }
            {isEditing ? (
                <input
                    type="text"
                    value={dish.name}
                    onChange={handleMealChange}
                />
            ) : (
                <span>{dish.name}</span>
            )}
            {/*{isEditing ? (*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={editedGrams}*/}
            {/*        onChange={handleGramsChange}*/}
            {/*    />*/}
            {/*) : (*/}
            {/*    <span>{dish.}g</span>*/}
            {/*)}*/}
            {isEditing ? (
                <>
                    <button>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default MealEntry;
