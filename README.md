# House Price Predictor

A complete end-to-end machine learning project that predicts house prices using XGBoost regression. This project includes data preprocessing, feature engineering, model training, evaluation, and a Flask web application for interactive predictions.

---

## Overview

This project builds a predictive model to estimate house prices based on various housing features. It covers the complete ML pipeline from raw data handling, preprocessing, and model optimization to deployment as a web application.

---

## Tech Stack

**Backend:**
- Python
- Flask (Web Framework)
- Gunicorn (WSGI Server)
- Pandas (Data Processing)
- NumPy (Numerical Computing)
- Scikit-learn (ML Preprocessing)
- XGBoost (Model Training)
- Joblib (Model Serialization)

**Frontend:**
- HTML5
- CSS3
- JavaScript

---

## Project Structure

```
House-Price-Predictor/
├── app/                          # Flask web application
│   ├── app.py                    # Flask app with prediction endpoint
│   ├── static/
│   │   ├── script.js             # Front-end logic
│   │   └── style.css             # Styling
│   └── templates/
│       └── index.html            # Web interface
├── data/
│   └── housing.csv               # California Housing Dataset
├── models/
│   └── model.pkl                 # Trained XGBoost model
├── notebooks/
│   └── eda.ipynb                 # Exploratory Data Analysis
├── src/
│   ├── train.py                  # Model training script
│   ├── preprocess.py             # Data preprocessing pipeline
│   └── evaluate.py               # Model evaluation script
├── requirements.txt              # Python dependencies
├── Procfile                      # Deployment configuration
└── README.md
```

---

## Features

**Data Processing:**
- Missing value imputation (median strategy)
- Log transformation for skewed features
- Feature scaling using StandardScaler
- Separate pipelines for skewed and normal features

**Feature Engineering:**
- Automatic feature grouping (skewed vs. normal columns)
- Skewed features: `total_rooms`, `total_bedrooms`, `population`, `households`
- Regular features: `longitude`, `latitude`, `housing_median_age`, `median_income`

**Model:**
- XGBoost Regressor with optimized hyperparameters
- Scikit-learn Pipeline for reproducibility
- Model evaluation metrics: MAE, RMSE, R² Score

**Web Application:**
- Interactive Flask-based interface
- Real-time price predictions
- Sliders and input fields for property features
- RESTful API endpoint for predictions

---

## Machine Learning Concepts

- **Regression Models:** XGBoost
- **Data Preprocessing:** Imputation, Scaling, Transformation
- **Feature Engineering:** Feature grouping and normalization
- **Model Evaluation:** MAE, RMSE, R² Score, Train-Test Split
- **Pipeline Architecture:** Scikit-learn Pipeline with ColumnTransformer

---

## Model Details

**Algorithm:** XGBoost Regressor

**Hyperparameters:**
- `n_estimators`: 300
- `learning_rate`: 0.05
- `max_depth`: 4
- `subsample`: 0.8
- `colsample_bytree`: 0.8
- `reg_alpha`: 1
- `reg_lambda`: 1

**Dataset:** California Housing Dataset

**Train-Test Split:** 70-30

---

## Installation & Usage

### Prerequisites
- Python 3.7+
- pip

### Setup
```bash
# Clone the repository
git clone <https://github.com/Abhinavkumar2025/House-Price-Predictor>
cd House-Price-Predictor

# Install dependencies
pip install -r requirements.txt

# Train the model
python src/train.py

# Evaluate the model
python src/evaluate.py

# Run the web application
python app/app.py
```

The web application will be available at `http://localhost:10000`

---

## Model Evaluation

Evaluate the model using the provided evaluation script:
```bash
python src/evaluate.py
```

This will display:
- **MAE (Mean Absolute Error)** on train and test sets
- **RMSE (Root Mean Squared Error)** on train and test sets
- **R² Score** on train and test sets

---

## 🌐 API Endpoint

**POST** `/predict`

**Request Body:**
```json
{
  "total_rooms": 20,
  "total_bedrooms": 5,
  "housing_median_age": 20,
  "households": 500,
  "median_income": 4.5,
  "longitude": -119.6,
  "latitude": 35.6,
  "population": 1400
}
```

**Response:**
```json
{
  "predicted_price": 150000.00
}
```

---

## Files Description

| File | Purpose |
|------|---------|
| `src/train.py` | Trains the XGBoost model and saves it |
| `src/preprocess.py` | Defines data preprocessing pipeline |
| `src/evaluate.py` | Evaluates model performance |
| `app/app.py` | Flask application with prediction endpoint |
| `notebooks/eda.ipynb` | Exploratory data analysis |

---

## EDA Notebook

The `notebooks/eda.ipynb` notebook contains exploratory data analysis including:
- Dataset overview and statistics
- Missing value analysis
- Feature distributions
- Correlation analysis

---

## Deployment

The project is configured for deployment with Gunicorn:
```bash
gunicorn app.app:app
```

Port can be configured via the `PORT` environment variable (default: 10000).

---
