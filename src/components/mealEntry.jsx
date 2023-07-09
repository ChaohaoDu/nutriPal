import React, {useState} from 'react';

const MealEntry = ({mealName, grams, onDelete, onEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMeal, setEditedMeal] = useState(mealName);
    const [editedGrams, setEditedGrams] = useState(grams);

    const handleDelete = () => {
        onDelete();
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(editedMeal, editedGrams);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedMeal(mealName);
        setEditedGrams(grams);
    };

    const handleMealChange = (e) => {
        setEditedMeal(e.target.value);
    };

    const handleGramsChange = (e) => {
        setEditedGrams(e.target.value);
    };

    return (
        <div className="meal-entry">
            {isEditing ? (
                <input
                    type="text"
                    value={editedMeal}
                    onChange={handleMealChange}
                />
            ) : (
                <span>{mealName}</span>
            )}
            {isEditing ? (
                <input
                    type="text"
                    value={editedGrams}
                    onChange={handleGramsChange}
                />
            ) : (
                <span>{grams}g</span>
            )}
            {isEditing ? (
                <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default MealEntry;
