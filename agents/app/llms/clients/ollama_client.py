from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from langchain_community.llms import Ollama
from app.llms.LLMProvider import LLMProvider
from langchain_core.language_models import LLM

class OllamaProvider(LLMProvider):
    def create_llm(self, model: str = "mistral", temperature: float = 0.4, base_url: str = "http://ollama:11434") -> LLM:
        return Ollama(
            model=model,
            temperature=temperature,
            base_url=base_url,
            # Add timeout and other stability parameters
            timeout=60,
            keep_alive=True
        )