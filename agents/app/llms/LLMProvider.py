from abc import ABC, abstractmethod
from langchain_core.language_models import LLM
import os


class LLMProvider(ABC):
    @abstractmethod
    def create_llm(self, **kwargs) -> LLM:
        pass