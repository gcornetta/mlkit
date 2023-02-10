import pyodide.ffi as ffi
from sklearn import datasets, neighbors, linear_model

# load digits dataset.
X_digits, y_digits = datasets.load_digits(return_X_y=True)
X_digits = X_digits / X_digits.max()

# load digits datasetcomputes the number of samples.
n_samples = len(X_digits)

# split the dataset into train and test.
# 90% samples are for training, 10% samples for testing.
X_train = X_digits[: int(0.9 * n_samples)]
y_train = y_digits[: int(0.9 * n_samples)]
X_test = X_digits[int(0.9 * n_samples) :]
y_test = y_digits[int(0.9 * n_samples) :]

# select the models (knn and logistic regressions)
knn = neighbors.KNeighborsClassifier()
logistic = linear_model.LogisticRegression(max_iter=1000)

# fit the models to the datasets and return the accuracy score.
# Data is returned as a Python dictionary and converted into a 
# JavaScript object using the ffi class provided by Pyodide.
# Pyodide converts a Python dictionary into a JavaScript Map.
ffi.to_js({ 'knn': knn.fit(X_train, y_train).score(X_test, y_test),
        'logistic regression': logistic.fit(X_train, y_train).score(X_test, y_test)})