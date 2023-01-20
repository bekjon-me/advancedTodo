from rest_framework import serializers
from .models import Comment


class CommentIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['tcid']
        read_only_fields = ['tcid']


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        read_only=True, slug_field='username')
    replies = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='tcid')
    parent = serializers.SlugRelatedField(
        read_only=True, slug_field='tcid')

    class Meta:
        model = Comment
        fields = ['tcid', 'author', 'text', 'replies', 'created', 'parent']
        read_only_fields = ['tcid', 'author', 'replies', 'created', 'parent']
