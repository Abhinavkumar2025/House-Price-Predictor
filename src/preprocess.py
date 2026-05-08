from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler,FunctionTransformer
from sklearn.compose import ColumnTransformer

import numpy as np


def feature_grouping():
    skewed_cols = ['total_rooms', 'total_bedrooms', 'population', 'households']
    other_cols = ['longitude', 'latitude', 'housing_median_age', 'median_income']
    
    return skewed_cols, other_cols


def create_pipelines():
    skewed_cols, other_cols = feature_grouping()
    
    skewed_pipeline = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy='median')),
        ("log", FunctionTransformer(np.log1p)),
        ("scaler", StandardScaler())
    ])


    other_pipeline = Pipeline(steps=[
        ("imputer",SimpleImputer(strategy='median')),
        ("scaler",StandardScaler())
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('skewed_pipe', skewed_pipeline,skewed_cols),
            ('basic',other_pipeline,other_cols)
        ]
    )
    
    return preprocessor
