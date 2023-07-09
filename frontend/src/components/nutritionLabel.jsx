import React from 'react';
import './NutritionLabel.css';

const NutritionLabel = ({ foodName, servings, calories, fat, carbs, protein }) => {
    return (
        <div className="nutrition-label">
            <h2>{foodName}</h2>
            <div className="nutrition-info">
                <div className="nutrition-row">
                    <span className="label">Servings:</span>
                    <span className="value">{servings}</span>
                </div>
                <div className="nutrition-row">
                    <span className="label">Calories:</span>
                    <span className="value">{calories}</span>
                </div>
                <div className="nutrition-row">
                    <span className="label">Fat:</span>
                    <span className="value">{fat}g</span>
                </div>
                <div className="nutrition-row">
                    <span className="label">Carbs:</span>
                    <span className="value">{carbs}g</span>
                </div>
                <div className="nutrition-row">
                    <span className="label">Protein:</span>
                    <span className="value">{protein}g</span>
                </div>
            </div>
        </div>
    );
};

export default NutritionLabel;
