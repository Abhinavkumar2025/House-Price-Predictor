import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor

from preprocess import create_pipelines

df = pd.read_csv("data/housing.csv")

x = df.drop("median_house_value",axis=1)
y = df["median_house_value"]

X_train,X_test,y_train,y_test = train_test_split(x,y,test_size=0.3,random_state=42)

preprocessor = create_pipelines()

model = XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=4,
    subsample=0.8,
    colsample_bytree=0.8,
    reg_alpha=1,
    reg_lambda=1,
    random_state=42
)


pipeline = Pipeline([
    ("preprocessor",preprocessor),
    ("model",model)
])

pipeline.fit(X_train,y_train)

joblib.dump(pipeline,"models/model.pkl")
print("Model saved successfully!")