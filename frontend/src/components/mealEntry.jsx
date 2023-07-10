import React, {useState} from 'react';

const MealEntry = ({dish, onDelete, onEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMeal, setEditedMeal] = useState(dish.name);

    const handleSave = () => {
        onEdit(dish._id, editedMeal);
        setIsEditing(false);
    };

    return (
        <div className="meal-entry">
            <span>{dish._id}</span>
            {isEditing ? (
                <input
                    type="text"
                    value={editedMeal}
                    onChange={(e) => setEditedMeal(e.target.value)}
                />
            ) : (
                <span>{dish.name}</span>
            )}
            {isEditing ? (
                <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default MealEntry;
