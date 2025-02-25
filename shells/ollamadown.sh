#!/bin/bash

# ollama pull 分段访问 脚本

MODEL_NAME="deepseek-r1:8b"
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    MODEL_EXISTS=$(ollama list | grep "$MODEL_NAME")
    if [ -n "$MODEL_EXISTS" ]; then
        echo "The model $MODEL_NAME is downloaded."
        exit 0
    fi

    echo "Attempting to run model $MODEL_NAME..."
    ollama run "$MODEL_NAME" &
    PID=$!
    sleep 120

    # 检查 ollama run 是否已经完成
    if kill -0 $PID 2>/dev/null; then
        echo "Terminating process $PID..."
        kill $PID
        wait $PID 2>/dev/null
    else
        echo "Process $PID has already finished."
    fi

    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Retrying in 3 seconds... (Attempt $RETRY_COUNT/$MAX_RETRIES)"
    sleep 3
done

echo "Failed to download the model after $MAX_RETRIES attempts."
exit 1